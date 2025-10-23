
if IsDuplicityVersion() then 
    local Tunnel = module("vrp","lib/Tunnel")
    local Proxy = module("vrp","lib/Proxy")
    vRPC = Tunnel.getInterface("vRP")
    vRP = Proxy.getInterface("vRP")
    src = {}
    Tunnel.bindInterface("black_admin",src)
    clientAPI = Tunnel.getInterface("black_admin")
else
    local Tunnel = module("vrp","lib/Tunnel")
    local Proxy = module("vrp","lib/Proxy")
    vRP = Proxy.getInterface("vRP")
    src = {}
    Tunnel.bindInterface("black_admin",src)
    serverAPI = Tunnel.getInterface("black_admin")
end 