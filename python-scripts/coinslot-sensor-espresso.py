import threading, sys, os, time, subprocess

env = os.environ.get("NODE_ENV")

coinPin = COIN_PIN # 2
coinRelayPin = COIN_RELAY_PIN # 17
coinRelayActive = COIN_RELAY_ACTIVE # 1

billPin = BILL_PIN # 14
billRelayPin = BILL_RELAY_PIN # 15
billRelayActive = BILL_RELAY_ACTIVE # 0

interval = 0.01
isPaying = False

coinPulsess = 0
billPulses = 0
bouncetime = 10

pendingCoinInsert = False
pendingBillInsert = False

lastCoinPulseAt = 0
lastBillPulseAt = 0

billThreshold = 900
coinThreshold = 250

billPulseRatio = 10 # BILL_PULSE_RATIO # 10

# coin credits pin
coin_gpio_path = "/sys/class/gpio" if env == "production" else "."
coin_export_path = coin_gpio_path + ("/export" if env=="production" else "/.tmp/export.dev")
coin_edge_path = coin_gpio_path + "/gpio" + str(coinPin) + ("/edge" if env=="production" else "/edge.dev")
coin_value_path = coin_gpio_path + "/gpio" + str(coinPin) + ("/value" if env=="production" else "/value.dev")

# coin relay pin
coin_relay_gpio_path = "/sys/class/gpio" if env == "production" else "."
coin_relay_export_path = coin_relay_gpio_path + ("/export" if env=="production" else "/.tmp/export.dev")
coin_relay_edge_path = coin_relay_gpio_path + "/gpio" + str(coinRelayPin) + ("/edge" if env=="production" else "/edge.dev")
coin_relay_value_path = coin_relay_gpio_path + "/gpio" + str(coinRelayPin) + ("/value" if env=="production" else "/value.dev")

# bill credits pin
bill_gpio_path = "/sys/class/gpio" if env == "production" else "."
bill_export_path = bill_gpio_path + ("/export" if env=="production" else "/.tmp/export.dev")
bill_edge_path = bill_gpio_path + "/gpio" + str(billPin) + ("/edge" if env=="production" else "/edge.dev")
bill_value_path = bill_gpio_path + "/gpio" + str(billPin) + ("/value" if env=="production" else "/value.dev")

# bill relay pin
bill_relay_gpio_path = "/sys/class/gpio" if env == "production" else "."
bill_relay_export_path = bill_relay_gpio_path + ("/export" if env=="production" else "/.tmp/export.dev")
bill_relay_edge_path = bill_relay_gpio_path + "/gpio" + str(billRelayPin) + ("/edge" if env=="production" else "/edge.dev")
bill_relay_value_path = bill_relay_gpio_path + "/gpio" + str(billRelayPin) + ("/value" if env=="production" else "/value.dev")

def setup():
  try:
    coin_export_file = open(coin_export_path, "w")
    coin_export_file.write(str(coinPin))
    coin_export_file.close()

    bill_export_file = open(bill_export_path, "w")
    bill_export_file.write(str(billPin))
    bill_export_file.close()

    coin_relay_export_file = open(coin_relay_export_path, "w")
    coin_relay_export_file.write(str(coinRelayPin))
    coin_relay_export_file.close()

    bill_relay_export_file = open(bill_relay_export_path, "w")
    bill_relay_export_file.write(str(billRelayPin))
    bill_relay_export_file.close()

  except:
    print("Error exporting GPIO " + str(pin_in) + "...")

  updateRelayPins(False)

def millis():
  return time.time() * 1000

def coinInterrupt(pin):
  global pendingCoinInsert
  global coinPulses
  global lastCoinPulseAt

  if isPaying == False: return

  gpio_value_file = open(coin_value_path, "r")
  gpio_val = int(gpio_value_file.read().strip())
  gpio_value_file.close()

  if gpio_val > 0: return

  updateRelayPins(False)
  if pendingCoinInsert == False:
    pendingCoinInsert = True
    coinPulses = 1
  else:
    coinPulses += 1

  lastCoinPulseAt = millis()

def billInterupt(pin):
  global pendingBillInsert
  global billPulses
  global lastBillPulseAt

  if isPaying == False: return
  gpio_value_file = open(bill_value_path, "r")
  gpio_val = int(gpio_value_file.read().strip())
  gpio_value_file.close()

  if gpio_val > 0: return

  updateRelayPins(False)

  if pendingBillInsert == False:
    pendingBillInsert = True
    billPulses = 1
  else:
    billPulses += 1

  lastBillPulseAt = millis()

def updateRelayPins(isEnable):
  coin_gpio_value_file = open(coin_relay_value_path, "w")
  bill_gpio_value_file = open(bill_relay_value_path, "w")

  if isEnable:
    # enable
    bill_gpio_value_file.write(str(billRelayActive))
    coin_gpio_value_file.write(str(coinRelayActive))
  else:
    # disable
    bill_gpio_value_file.write(str(0 if billRelayActive > 0 else 1))
    coin_gpio_value_file.write(str(0 if coinRelayActive > 0 else 1))

  coin_gpio_value_file.close()
  bill_gpio_value_file.close()

def processCoinCredits():
  global pendingCoinInsert
  global coinPulses
  global lastCoinPulseAt

  if coinPulses <= 0: return

  print str(coinPulses)
  sys.stdout.flush()

  pendingCoinInsert = False
  coinPulses = 0
  lastCoinPulseAt = 0
  updateRelayPins(isPaying)

def processBillCredits():
  global pendingBillInsert
  global billPulses
  global lastBillPulseAt

  if billPulses <= 0: return

  credits = billPulses * billPulseRatio;
  if (credits >= 20 and credits < 50):
    credits = 20;
  elif (credits >= 50 and credits < 100):
    credits = 50;
  elif (credits >= 100 and credits < 200):
    credits = 100;
  elif (credits >= 200 and credits < 500):
    credits = 200;
  elif (credits >= 500 and credits < 1000):
    credits = 500;
  elif (credits >= 1000):
    credits = 1000;

  print str(credits)
  sys.stdout.flush()

  pendingBillInsert = False
  billPulses = 0
  lastBillPulseAt = 0

  updateRelayPins(isPaying)

def captureInput():
  global isPaying

  while True:
    line = sys.stdin.readline()

    if line == "payment:start\n":
      isPaying = True
    elif line == "payment:stop\n":
      isPaying = False

    updateRelayPins(isPaying)

class Runner:
  def __init__(self):
      pass

  def loop(self):
    while True:

      if pendingBillInsert and (millis() - lastBillPulseAt) >= billThreshold:
        processBillCredits()

      if pendingCoinInsert and (millis() - lastCoinPulseAt) >= coinThreshold:
        processCoinCredits()

      if millis() % 800 == 0 and pendingBillInsert == False and pendingCoinInsert == False:
        updateRelayPins(isPaying)

      time.sleep(interval)

try:
  setup()

  runner = Runner()
  RunnerThread = threading.Thread(name='Runner', target=runner.loop)
  RunnerThread.start()

  captureInput()

finally:
  print("Done.")
