-- Adaptador para vRP2 (vRP Legacy)
-- Compatível com vRP2 Framework

local VRP2Adapter = {}
local Tunnel = nil
local Proxy = nil

-- Inicialização do adaptador vRP2
function VRP2Adapter.Initialize()
    Tunnel = module("vrp", "lib/Tunnel")
    Proxy = module("vrp", "lib/Proxy")
    
    if IsDuplicityVersion() then
        -- Servidor
        vRPC = Tunnel.getInterface("vRP")
        vRP = Proxy.getInterface("vRP")
        VRP2Adapter.isServer = true
    else
        -- Cliente
        vRP = Proxy.getInterface("vRP")
        VRP2Adapter.isServer = false
    end
    
    print("^2[VRP2-ADAPTER] Adaptador vRP2 inicializado^0")
end

-- Funções de usuário
function VRP2Adapter.GetUserId(source)
    return vRP.getUserId(source)
end

function VRP2Adapter.GetUserSource(user_id)
    return vRP.userSource(user_id)
end

function VRP2Adapter.GetUserName(user_id)
    local identity = vRP.userIdentity(user_id)
    if identity then
        return identity.name .. " " .. identity.name2
    end
    return "Desconhecido"
end

function VRP2Adapter.GetUserIdentity(user_id)
    return vRP.userIdentity(user_id)
end

function VRP2Adapter.GetPlayers()
    return vRP.getUsers()
end

function VRP2Adapter.IsPlayerOnline(user_id)
    return vRP.userSource(user_id) ~= nil
end

-- Funções de permissões
function VRP2Adapter.HasPermission(user_id, permission)
    return vRP.hasPermission(user_id, permission)
end

function VRP2Adapter.GetUserGroups(user_id)
    local groups = vRP.getUserGroups(user_id)
    local userGroups = {}
    
    for group, _ in pairs(groups) do
        table.insert(userGroups, group)
    end
    
    return userGroups
end

function VRP2Adapter.GetUserGroup(user_id)
    local groups = vRP.getUserGroups(user_id)
    for group, _ in pairs(groups) do
        return group
    end
    return "user"
end

function VRP2Adapter.AddUserGroup(user_id, group)
    return vRP.addUserGroup(user_id, group)
end

function VRP2Adapter.RemoveUserGroup(user_id, group)
    return vRP.removeUserGroup(user_id, group)
end

function VRP2Adapter.GetUsersByPermission(permission)
    return vRP.getUsersByPermission(permission)
end

-- Funções de inventário
function VRP2Adapter.GetItems()
    return vRP.getItems()
end

function VRP2Adapter.GetItemName(item)
    return vRP.getItemName(item)
end

function VRP2Adapter.GiveItem(user_id, item, amount)
    return vRP.giveInventoryItem(user_id, item, amount, true)
end

function VRP2Adapter.RemoveItem(user_id, item, amount)
    return vRP.tryGetInventoryItem(user_id, item, amount)
end

function VRP2Adapter.GetUserInventory(user_id)
    local data = vRP.getUserDataTable(user_id)
    local inventory = {}
    
    if data and data.inventory then
        for item, amount in pairs(data.inventory) do
            table.insert(inventory, {
                item = item,
                amount = amount,
                name = VRP2Adapter.GetItemName(item)
            })
        end
    end
    
    return inventory
end

-- Funções de veículos
function VRP2Adapter.GetVehicles()
    return vRP.getVehicles()
end

function VRP2Adapter.GetVehicleName(vehicle)
    return vRP.getVehicleName(vehicle)
end

function VRP2Adapter.GetVehicleChest(vehicle)
    return vRP.getVehicleChest(vehicle)
end

function VRP2Adapter.GetUserVehicles(user_id)
    local data = vRP.getUserVehicles(user_id)
    local vehicles = {}
    
    for _, v in pairs(data) do
        table.insert(vehicles, {
            spawn = v.vehicle,
            plate = v.plate,
            engine = v.engine or 100,
            body = v.body or 100,
            gas = v.gas or 100,
            trunk = v.trunk or 0
        })
    end
    
    return vehicles
end

function VRP2Adapter.AddVehicle(user_id, vehicle, plate)
    return vRP.addUserVehicle(user_id, vehicle, plate)
end

function VRP2Adapter.RemoveVehicle(user_id, vehicle, plate)
    return vRP.removeUserVehicle(user_id, vehicle, plate)
end

-- Funções de dinheiro
function VRP2Adapter.GetUserMoney(user_id)
    return vRP.getMoney(user_id)
end

function VRP2Adapter.GetUserBank(user_id)
    return vRP.getBank(user_id)
end

function VRP2Adapter.GiveMoney(user_id, amount)
    return vRP.giveBankMoney(user_id, amount)
end

function VRP2Adapter.GiveItemMoney(user_id, amount)
    return vRP.giveInventoryItem(user_id, "dollars", amount, true)
end

-- Funções de banco de dados
function VRP2Adapter.Prepare(query, sql)
    return vRP.prepare(query, sql)
end

function VRP2Adapter.Query(query, params)
    return vRP.query(query, params)
end

function VRP2Adapter.Execute(query, params)
    return vRP.execute(query, params)
end

-- Funções de kick/ban
function VRP2Adapter.KickPlayer(user_id, reason)
    return vRP.kick(user_id, reason)
end

function VRP2Adapter.BanPlayer(user_id, reason)
    local identity = vRP.userIdentity(user_id)
    if identity then
        vRP.kick(user_id, reason)
        return vRP.execute("banneds/insertBanned", {steam = identity.steam})
    end
    return false
end

function VRP2Adapter.UnbanPlayer(steam)
    return vRP.execute("banneds/removeBanned", {steam = steam})
end

-- Funções de dados do usuário
function VRP2Adapter.GetUserData(user_id, key)
    return vRP.getUserData(user_id, key)
end

function VRP2Adapter.SetUserData(user_id, key, value)
    return vRP.setUserData(user_id, key, value)
end

-- Funções de propriedades
function VRP2Adapter.GetUserProperties(user_id)
    local data = vRP.getUserProperties(user_id)
    local properties = {}
    
    for _, v in pairs(data) do
        table.insert(properties, {
            name = v.name,
            street = v.street or ""
        })
    end
    
    return properties
end

function VRP2Adapter.GiveProperty(user_id, name)
    return vRP.giveUserProperty(user_id, name)
end

function VRP2Adapter.RemoveProperty(user_id, name)
    return vRP.removeUserProperty(user_id, name)
end

-- Funções de armadura
function VRP2Adapter.SetArmour(source, value)
    return vRP.setArmour(source, value)
end

-- Funções de notificação
function VRP2Adapter.Notify(source, type, title, message, duration)
    TriggerClientEvent("Notify", source, type, title, message, duration or 5000)
end

function VRP2Adapter.NotifyAll(type, title, message, duration)
    TriggerClientEvent("Notify", -1, type, title, message, duration or 5000)
end

-- Funções de eventos
function VRP2Adapter.TriggerClientEvent(eventName, source, ...)
    TriggerClientEvent(eventName, source, ...)
end

function VRP2Adapter.TriggerServerEvent(eventName, ...)
    TriggerServerEvent(eventName, ...)
end

function VRP2Adapter.RegisterServerEvent(eventName, handler)
    RegisterNetEvent(eventName)
    AddEventHandler(eventName, handler)
end

function VRP2Adapter.RegisterClientEvent(eventName, handler)
    RegisterNetEvent(eventName)
    AddEventHandler(eventName, handler)
end

-- Funções de comandos
function VRP2Adapter.RegisterCommand(command, handler, restricted)
    RegisterCommand(command, handler, restricted)
end

-- Funções de NUI
function VRP2Adapter.SendNUIMessage(data)
    SendNUIMessage(data)
end

function VRP2Adapter.SetNuiFocus(hasFocus, hasCursor)
    SetNuiFocus(hasFocus, hasCursor)
end

function VRP2Adapter.RegisterNUICallback(callback, handler)
    RegisterNUICallback(callback, handler)
end

-- Funções de veículos (criação)
function VRP2Adapter.CreateVehicle(model, x, y, z, heading)
    local mHash = GetHashKey(model)
    local vehicle = CreateVehicle(mHash, x, y, z, heading, true, true)
    return vehicle
end

function VRP2Adapter.SpawnVehicleForPlayer(source, model, x, y, z, heading)
    local vehicle = VRP2Adapter.CreateVehicle(model, x, y, z, heading)
    local playerPed = GetPlayerPed(source)
    local plate = "ADM" .. math.random(10000, 99999)
    
    if DoesEntityExist(vehicle) then
        SetVehicleNumberPlateText(vehicle, plate)
        SetPedIntoVehicle(playerPed, vehicle, -1)
        return vehicle, plate
    end
    
    return nil, nil
end

-- Funções de reparo de veículo
function VRP2Adapter.RepairVehicle(source)
    if vRPC then
        local vehicle, vehNet, vehPlate = vRPC.vehList(source, 4)
        if vehicle then
            local activePlayers = vRPC.activePlayers(source)
            for _, v in pairs(activePlayers) do
                TriggerClientEvent("inventory:repairAdmin", v, vehNet, vehPlate)
            end
        end
    end
end

-- Funções de tuning de veículo
function VRP2Adapter.TuneVehicle(source)
    TriggerClientEvent("admin:vehicleTuning", source)
end

-- Funções de whitelist
function VRP2Adapter.SetWhitelist(user_id, status)
    local identity = vRP.userIdentity(user_id)
    if identity then
        return vRP.execute("accounts/setwl", {whitelist = status and 1 or 0, id = user_id})
    end
    return false
end

-- Funções de salário
function VRP2Adapter.GiveSalary(user_id, amount, group)
    local userSource = VRP2Adapter.GetUserSource(user_id)
    if user_id and userSource then
        vRP.giveBankMoney(user_id, amount)
        VRP2Adapter.Notify(userSource, "verde", "Salário", string.format("Foi adicionado a sua conta bancária do salário do seu cargo %s no valor de %d.", group, amount), 5000)
    end
end

return VRP2Adapter