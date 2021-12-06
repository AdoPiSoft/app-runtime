import sys, os, shutil
args = sys.argv[1:]

if len(args) < 2:
  exit(1)

plugin_name = args[0]
plugin_path = args[1]
public_plugins_path = os.environ["APPDIR"] + "/public/plugins"

if not os.path.exists(public_plugins_path):
  os.mkdir(public_plugins_path)

if not os.path.exists(plugin_path):
  exit(0)

if not os.path.exists(public_plugins_path + "/" + plugin_name):
  os.mkdir(public_plugins_path + "/" + plugin_name)

if os.path.exists(plugin_path+"/assets"):
  if os.path.exists(public_plugins_path+"/"+plugin_name+"/assets"):
    shutil.rmtree(public_plugins_path+"/"+plugin_name+"/assets")
  shutil.copytree(plugin_path+"/assets", public_plugins_path+"/"+plugin_name+"/assets")

if os.path.exists(plugin_path+"/views"):
  if os.path.exists(public_plugins_path+"/"+plugin_name+"/views"):
    shutil.rmtree(public_plugins_path+"/"+plugin_name+"/views")
  shutil.copytree(plugin_path+"/views", public_plugins_path+"/"+plugin_name+"/views")