-- Adaptador para ESX
-- Compatível com ESX Framework

local ESXAdapter = {}
local ESX = nil

-- Inicialização do adaptador ESX
function ESXAdapter.Initialize()
    if IsDuplicityVersion() then
        -- Servidor
        ESX = exports['es_extended']:getSharedObject()
        ESXAdapter.isServer = true
    else
        -- Cliente
        while ESX == nil do
            TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)
            Wait(0)
        end
        ESXAdapter.isServer = false
    end
    
    print("^2[ESX-ADAPTER] Adaptador ESX inicializado^0")
end

-- Funções de usuário
function ESXAdapter.GetUserId(source)
    local xPlayer = ESX.GetPlayerFromId(source)
    return xPlayer and xPlayer.source or nil
end

function ESXAdapter.GetUserSource(user_id)
    local xPlayer = ESX.GetPlayerFromId(user_id)
    return xPlayer and xPlayer.source or nil
end

function ESXAdapter.GetUserName(user_id)
    local xPlayer = ESX.GetPlayerFromId(user_id)
    if xPlayer then
        return xPlayer.getName()
    end
    return "Desconhecido"
end

function ESXAdapter.GetUserIdentity(user_id)
    local xPlayer = ESX.GetPlayerFromId(user_id)
    if xPlayer then
        return {
            name = xPlayer.get('firstName'),
            name2 = xPlayer.get('lastName'),
            dateofbirth = xPlayer.get('dateofbirth'),
            sex = xPlayer.get('sex'),
            height = xPlayer.get('height'),
            phone = xPlayer.get('phone_number'),
            steam = xPlayer.identifier
        }
    end
    return nil
end

function ESXAdapter.GetPlayers()
    return ESX.GetPlayers()
end

function ESXAdapter.IsPlayerOnline(user_id)
    local xPlayer = ESX.GetPlayerFromId(user_id)
    return xPlayer ~= nil
end

-- Funções de permissões
function ESXAdapter.HasPermission(user_id, permission)
    local xPlayer = ESX.GetPlayerFromId(user_id)
    if xPlayer then
        return xPlayer.getGroup() == permission or xPlayer.getGroup() == 'admin' or xPlayer.getGroup() == 'superadmin'
    end
    return false
end

function ESXAdapter.GetUserGroups(user_id)
    local xPlayer = ESX.GetPlayerFromId(user_id)
    if xPlayer then
        return {xPlayer.getGroup()}
    end
    return {"user"}
end

function ESXAdapter.GetUserGroup(user_id)
    local xPlayer = ESX.GetPlayerFromId(user_id)
    if xPlayer then
        return xPlayer.getGroup()
    end
    return "user"
end

function ESXAdapter.AddUserGroup(user_id, group)
    local xPlayer = ESX.GetPlayerFromId(user_id)
    if xPlayer then
        xPlayer.setGroup(group)
        return true
    end
    return false
end

function ESXAdapter.RemoveUserGroup(user_id, group)
    local xPlayer = ESX.GetPlayerFromId(user_id)
    if xPlayer then
        xPlayer.setGroup('user')
        return true
    end
    return false
end

function ESXAdapter.GetUsersByPermission(permission)
    local players = ESX.GetPlayers()
    local users = {}
    
    for _, playerId in pairs(players) do
        local xPlayer = ESX.GetPlayerFromId(playerId)
        if xPlayer and (xPlayer.getGroup() == permission or xPlayer.getGroup() == 'admin' or xPlayer.getGroup() == 'superadmin') then
            table.insert(users, playerId)
        end
    end
    
    return users
end

-- Funções de inventário
function ESXAdapter.GetItems()
    return ESX.GetItems()
end

function ESXAdapter.GetItemName(item)
    local itemData = ESX.GetItem(item)
    return itemData and itemData.label or item
end

function ESXAdapter.GiveItem(user_id, item, amount)
    local xPlayer = ESX.GetPlayerFromId(user_id)
    if xPlayer then
        return xPlayer.addInventoryItem(item, amount)
    end
    return false
end

function ESXAdapter.RemoveItem(user_id, item, amount)
    local xPlayer = ESX.GetPlayerFromId(user_id)
    if xPlayer then
        return xPlayer.removeInventoryItem(item, amount)
    end
    return false
end

function ESXAdapter.GetUserInventory(user_id)
    local xPlayer = ESX.GetPlayerFromId(user_id)
    if xPlayer then
        return xPlayer.getInventory()
    end
    return {}
end

-- Funções de veículos
function ESXAdapter.GetVehicles()
    return ESX.GetVehicles()
end

function ESXAdapter.GetVehicleName(vehicle)
    local vehicleData = ESX.GetVehicle(vehicle)
    return vehicleData and vehicleData.name or vehicle
end

function ESXAdapter.GetVehicleChest(vehicle)
    local vehicleData = ESX.GetVehicle(vehicle)
    return vehicleData and vehicleData.trunk or 0
end

function ESXAdapter.GetUserVehicles(user_id)
    local result = ESXAdapter.Query("SELECT * FROM owned_vehicles WHERE owner = @owner", {owner = user_id})
    local vehicles = {}
    
    for _, v in pairs(result) do
        local vehicleData = json.decode(v.vehicle)
        table.insert(vehicles, {
            spawn = v.vehicle,
            plate = v.plate,
            engine = vehicleData.engine or 100,
            body = vehicleData.body or 100,
            gas = vehicleData.gas or 100,
            trunk = vehicleData.trunk or 0
        })
    end
    
    return vehicles
end

function ESXAdapter.AddVehicle(user_id, vehicle, plate)
    local vehicleData = {
        engine = 100,
        body = 100,
        gas = 100,
        trunk = 0
    }
    
    return ESXAdapter.Execute("INSERT INTO owned_vehicles (owner, plate, vehicle) VALUES (@owner, @plate, @vehicle)", {
        owner = user_id,
        plate = plate or ESXAdapter.GeneratePlate(),
        vehicle = json.encode(vehicleData)
    })
end

function ESXAdapter.RemoveVehicle(user_id, vehicle, plate)
    return ESXAdapter.Execute("DELETE FROM owned_vehicles WHERE owner = @owner AND plate = @plate", {
        owner = user_id,
        plate = plate
    })
end

-- Funções de dinheiro
function ESXAdapter.GetUserMoney(user_id)
    local xPlayer = ESX.GetPlayerFromId(user_id)
    if xPlayer then
        return xPlayer.getMoney()
    end
    return 0
end

function ESXAdapter.GetUserBank(user_id)
    local xPlayer = ESX.GetPlayerFromId(user_id)
    if xPlayer then
        return xPlayer.getAccount('bank').money
    end
    return 0
end

function ESXAdapter.GiveMoney(user_id, amount)
    local xPlayer = ESX.GetPlayerFromId(user_id)
    if xPlayer then
        xPlayer.addAccountMoney('bank', amount)
        return true
    end
    return false
end

function ESXAdapter.GiveItemMoney(user_id, amount)
    local xPlayer = ESX.GetPlayerFromId(user_id)
    if xPlayer then
        xPlayer.addMoney(amount)
        return true
    end
    return false
end

-- Funções de banco de dados
function ESXAdapter.Prepare(query, sql)
    return MySQL.prepare(query, sql)
end

function ESXAdapter.Query(query, params)
    return MySQL.query(query, params)
end

function ESXAdapter.Execute(query, params)
    return MySQL.execute(query, params)
end

-- Funções de kick/ban
function ESXAdapter.KickPlayer(user_id, reason)
    local xPlayer = ESX.GetPlayerFromId(user_id)
    if xPlayer then
        DropPlayer(xPlayer.source, reason)
        return true
    end
    return false
end

function ESXAdapter.BanPlayer(user_id, reason)
    local xPlayer = ESX.GetPlayerFromId(user_id)
    if xPlayer then
        DropPlayer(xPlayer.source, reason)
        return ESXAdapter.Execute("INSERT INTO bans (identifier, reason, expire) VALUES (@identifier, @reason, @expire)", {
            identifier = xPlayer.identifier,
            reason = reason,
            expire = os.time() + (365 * 24 * 60 * 60) -- 1 ano
        })
    end
    return false
end

function ESXAdapter.UnbanPlayer(identifier)
    return ESXAdapter.Execute("DELETE FROM bans WHERE identifier = @identifier", {identifier = identifier})
end

-- Funções de dados do usuário
function ESXAdapter.GetUserData(user_id, key)
    local xPlayer = ESX.GetPlayerFromId(user_id)
    if xPlayer then
        return xPlayer.get(key)
    end
    return nil
end

function ESXAdapter.SetUserData(user_id, key, value)
    local xPlayer = ESX.GetPlayerFromId(user_id)
    if xPlayer then
        xPlayer.set(key, value)
        return true
    end
    return false
end

-- Funções de propriedades
function ESXAdapter.GetUserProperties(user_id)
    local result = ESXAdapter.Query("SELECT * FROM owned_properties WHERE owner = @owner", {owner = user_id})
    local properties = {}
    
    for _, v in pairs(result) do
        table.insert(properties, {
            name = v.name,
            street = v.street or ""
        })
    end
    
    return properties
end

function ESXAdapter.GiveProperty(user_id, name)
    return ESXAdapter.Execute("INSERT INTO owned_properties (name, owner, price, interior, vault, fridge, tax, owner_id) VALUES (@name, @owner, @price, @interior, @vault, @fridge, @tax, @owner_id)", {
        name = name,
        owner = user_id,
        price = 100000,
        interior = "Diamond",
        vault = 100.00,
        fridge = 100.00,
        tax = os.time() + 2592000,
        owner_id = 1
    })
end

function ESXAdapter.RemoveProperty(user_id, name)
    return ESXAdapter.Execute("DELETE FROM owned_properties WHERE owner = @owner AND name = @name", {
        owner = user_id,
        name = name
    })
end

-- Funções de armadura
function ESXAdapter.SetArmour(source, value)
    SetPedArmour(source, value)
    return true
end

-- Funções de notificação
function ESXAdapter.Notify(source, type, title, message, duration)
    local xPlayer = ESX.GetPlayerFromId(source)
    if xPlayer then
        xPlayer.showNotification(message, type, duration or 5000)
    end
end

function ESXAdapter.NotifyAll(type, title, message, duration)
    TriggerClientEvent('esx:showNotification', -1, message, type, duration or 5000)
end

-- Funções de eventos
function ESXAdapter.TriggerClientEvent(eventName, source, ...)
    TriggerClientEvent(eventName, source, ...)
end

function ESXAdapter.TriggerServerEvent(eventName, ...)
    TriggerServerEvent(eventName, ...)
end

function ESXAdapter.RegisterServerEvent(eventName, handler)
    RegisterNetEvent(eventName)
    AddEventHandler(eventName, handler)
end

function ESXAdapter.RegisterClientEvent(eventName, handler)
    RegisterNetEvent(eventName)
    AddEventHandler(eventName, handler)
end

-- Funções de comandos
function ESXAdapter.RegisterCommand(command, handler, restricted)
    RegisterCommand(command, handler, restricted)
end

-- Funções de NUI
function ESXAdapter.SendNUIMessage(data)
    SendNUIMessage(data)
end

function ESXAdapter.SetNuiFocus(hasFocus, hasCursor)
    SetNuiFocus(hasFocus, hasCursor)
end

function ESXAdapter.RegisterNUICallback(callback, handler)
    RegisterNUICallback(callback, handler)
end

-- Funções de veículos (criação)
function ESXAdapter.CreateVehicle(model, x, y, z, heading)
    local mHash = GetHashKey(model)
    local vehicle = CreateVehicle(mHash, x, y, z, heading, true, true)
    return vehicle
end

function ESXAdapter.SpawnVehicleForPlayer(source, model, x, y, z, heading)
    local vehicle = ESXAdapter.CreateVehicle(model, x, y, z, heading)
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
function ESXAdapter.RepairVehicle(source)
    local vehicle = GetVehiclePedIsIn(GetPlayerPed(source), false)
    if vehicle ~= 0 then
        SetVehicleFixed(vehicle)
        SetVehicleDeformationFixed(vehicle)
        SetVehicleUndriveable(vehicle, false)
        SetVehicleEngineOn(vehicle, true, true)
    end
end

-- Funções de tuning de veículo
function ESXAdapter.TuneVehicle(source)
    local vehicle = GetVehiclePedIsIn(GetPlayerPed(source), false)
    if vehicle ~= 0 then
        SetVehicleModKit(vehicle, 0)
        for i = 0, 49 do
            SetVehicleMod(vehicle, i, -1, false)
        end
    end
end

-- Funções de whitelist
function ESXAdapter.SetWhitelist(user_id, status)
    local xPlayer = ESX.GetPlayerFromId(user_id)
    if xPlayer then
        return ESXAdapter.Execute("UPDATE users SET whitelist = @whitelist WHERE identifier = @identifier", {
            whitelist = status and 1 or 0,
            identifier = xPlayer.identifier
        })
    end
    return false
end

-- Funções de salário
function ESXAdapter.GiveSalary(user_id, amount, group)
    local xPlayer = ESX.GetPlayerFromId(user_id)
    if xPlayer then
        xPlayer.addAccountMoney('bank', amount)
        ESXAdapter.Notify(user_id, 'success', 'Salário', string.format("Foi adicionado a sua conta bancária do salário do seu cargo %s no valor de %d.", group, amount), 5000)
    end
end

-- Função para gerar placa
function ESXAdapter.GeneratePlate()
    local plate = ""
    local chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    for i = 1, 8 do
        plate = plate .. string.sub(chars, math.random(1, #chars), math.random(1, #chars))
    end
    return plate
end

return ESXAdapter