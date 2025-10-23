fx_version "bodacious"
game "gta5"

ui_page_preload 'yes'

files {
  "client-side/nui/**",
}

ui_page "client-side/nui/index.html"

shared_scripts {
  "@vrp/lib/utils.lua",
  "shared/module.lua"
}

client_scripts {
  "lib/utils.lua",
  "client-side/shared_client.lua",
  "client-side/*.lua"
}

server_scripts {
  "@vrp/lib/items.lua",
  "@vrp/lib/vehicles.lua",
  "lib/utils.lua",
  "updater.lua",
  "server-side/shared_server.lua",
  "server-side/*.lua"
}