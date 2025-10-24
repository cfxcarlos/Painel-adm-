-- Adaptador para QBCore
-- Compatível com QBCore Framework

local QBAdapter = {}
local QBCore = nil

-- Inicialização do adaptador QBCore
function QBAdapter.Initialize()
    if IsDuplicityVersion() then
        -- Servidor
        QBCore = exports['qb-core']:GetCoreObject()
        QBAdapter.isServer = true
    else
        -- Cliente
        QBCore = exports['qb-core']:GetCoreObject()
        QBAdapter.isServer = false
    end
    
    print("^2[QB-ADAPTER] Adaptador QBCore inicializado^0")
end

-- Funções de usuário
function QBAdapter.GetUserId(source)
    local Player = QBCore.Functions.GetPlayer(source)
    return Player and Player.PlayerData.citizenid or nil
end

function QBAdapter.GetUserSource(citizenid)
    local Player = QBCore.Functions.GetPlayerByCitizenId(citizenid)
    return Player and Player.PlayerData.source or nil
end

function QBAdapter.GetUserName(citizenid)
    local Player = QBCore.Functions.GetPlayerByCitizenId(citizenid)
    if Player then
        return Player.PlayerData.charinfo.firstname .. " " .. Player.PlayerData.charinfo.lastname
    end
    return "Desconhecido"
end

function QBAdapter.GetUserIdentity(citizenid)
    local Player = QBCore.Functions.GetPlayerByCitizenId(citizenid)
    if Player then
        return {
            name = Player.PlayerData.charinfo.firstname,
            name2 = Player.PlayerData.charinfo.lastname,
            dateofbirth = Player.PlayerData.charinfo.birthdate,
            sex = Player.PlayerData.charinfo.gender,
            height = Player.PlayerData.charinfo.height,
            phone = Player.PlayerData.charinfo.phone,
            steam = Player.PlayerData.license
        }
    end
    return nil
end

function QBAdapter.GetPlayers()
    return QBCore.Functions.GetQBPlayers()
end

function QBAdapter.IsPlayerOnline(citizenid)
    local Player = QBCore.Functions.GetPlayerByCitizenId(citizenid)
    return Player ~= nil
end

-- Funções de permissões
function QBAdapter.HasPermission(citizenid, permission)
    local Player = QBCore.Functions.GetPlayerByCitizenId(citizenid)
    if Player then
        return QBCore.Functions.HasPermission(Player.PlayerData.source, permission)
    end
    return false
end

function QBAdapter.GetUserGroups(citizenid)
    local Player = QBCore.Functions.GetPlayerByCitizenId(citizenid)
    if Player then
        return {Player.PlayerData.job.name}
    end
    return {"unemployed"}
end

function QBAdapter.GetUserGroup(citizenid)
    local Player = QBCore.Functions.GetPlayerByCitizenId(citizenid)
    if Player then
        return Player.PlayerData.job.name
    end
    return "unemployed"
end

function QBAdapter.AddUserGroup(citizenid, group)
    local Player = QBCore.Functions.GetPlayerByCitizenId(citizenid)
    if Player then
        Player.Functions.SetJob(group, 0)
        return true
    end
    return false
end

function QBAdapter.RemoveUserGroup(citizenid, group)
    local Player = QBCore.Functions.GetPlayerByCitizenId(citizenid)
    if Player then
        Player.Functions.SetJob("unemployed", 0)
        return true
    end
    return false
end

function QBAdapter.GetUsersByPermission(permission)
    local players = QBCore.Functions.GetQBPlayers()
    local users = {}
    
    for _, Player in pairs(players) do
        if QBCore.Functions.HasPermission(Player.PlayerData.source, permission) then
            table.insert(users, Player.PlayerData.citizenid)
        end
    end
    
    return users
end

-- Funções de inventário
function QBAdapter.GetItems()
    return QBCore.Shared.Items
end

function QBAdapter.GetItemName(item)
    local itemData = QBCore.Shared.Items[item]
    return itemData and itemData.label or item
end

function QBAdapter.GiveItem(citizenid, item, amount)
    local Player = QBCore.Functions.GetPlayerByCitizenId(citizenid)
    if Player then
        return Player.Functions.AddItem(item, amount)
    end
    return false
end

function QBAdapter.RemoveItem(citizenid, item, amount)
    local Player = QBCore.Functions.GetPlayerByCitizenId(citizenid)
    if Player then
        return Player.Functions.RemoveItem(item, amount)
    end
    return false
end

function QBAdapter.GetUserInventory(citizenid)
    local Player = QBCore.Functions.GetPlayerByCitizenId(citizenid)
    if Player then
        return Player.PlayerData.items
    end
    return {}
end

-- Funções de veículos
function QBAdapter.GetVehicles()
    return QBCore.Shared.Vehicles
end

function QBAdapter.GetVehicleName(vehicle)
    local vehicleData = QBCore.Shared.Vehicles[vehicle]
    return vehicleData and vehicleData.name or vehicle
end

function QBAdapter.GetVehicleChest(vehicle)
    local vehicleData = QBCore.Shared.Vehicles[vehicle]
    return vehicleData and vehicleData.trunk or 0
end

function QBAdapter.GetUserVehicles(citizenid)
    local result = QBAdapter.Query("SELECT * FROM player_vehicles WHERE citizenid = @citizenid", {citizenid = citizenid})
    local vehicles = {}
    
    for _, v in pairs(result) do
        local vehicleData = json.decode(v.mods)
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

function QBAdapter.AddVehicle(citizenid, vehicle, plate)
    local vehicleData = {
        engine = 100,
        body = 100,
        gas = 100,
        trunk = 0
    }
    
    return QBAdapter.Execute("INSERT INTO player_vehicles (license, citizenid, vehicle, hash, mods, plate, garage, state) VALUES (@license, @citizenid, @vehicle, @hash, @mods, @plate, @garage, @state)", {
        license = QBAdapter.GetUserIdentity(citizenid).steam,
        citizenid = citizenid,
        vehicle = vehicle,
        hash = GetHashKey(vehicle),
        mods = json.encode(vehicleData),
        plate = plate or QBAdapter.GeneratePlate(),
        garage = "pillboxgarage",
        state = 1
    })
end

function QBAdapter.RemoveVehicle(citizenid, vehicle, plate)
    return QBAdapter.Execute("DELETE FROM player_vehicles WHERE citizenid = @citizenid AND plate = @plate", {
        citizenid = citizenid,
        plate = plate
    })
end

-- Funções de dinheiro
function QBAdapter.GetUserMoney(citizenid)
    local Player = QBCore.Functions.GetPlayerByCitizenId(citizenid)
    if Player then
        return Player.PlayerData.money.cash
    end
    return 0
end

function QBAdapter.GetUserBank(citizenid)
    local Player = QBCore.Functions.GetPlayerByCitizenId(citizenid)
    if Player then
        return Player.PlayerData.money.bank
    end
    return 0
end

function QBAdapter.GiveMoney(citizenid, amount)
    local Player = QBCore.Functions.GetPlayerByCitizenId(citizenid)
    if Player then
        Player.Functions.AddMoney('bank', amount)
        return true
    end
    return false
end

function QBAdapter.GiveItemMoney(citizenid, amount)
    local Player = QBCore.Functions.GetPlayerByCitizenId(citizenid)
    if Player then
        Player.Functions.AddMoney('cash', amount)
        return true
    end
    return false
end

-- Funções de banco de dados
function QBAdapter.Prepare(query, sql)
    return MySQL.prepare(query, sql)
end

function QBAdapter.Query(query, params)
    return MySQL.query(query, params)
end

function QBAdapter.Execute(query, params)
    return MySQL.execute(query, params)
end

-- Funções de kick/ban
function QBAdapter.KickPlayer(citizenid, reason)
    local Player = QBCore.Functions.GetPlayerByCitizenId(citizenid)
    if Player then
        DropPlayer(Player.PlayerData.source, reason)
        return true
    end
    return false
end

function QBAdapter.BanPlayer(citizenid, reason)
    local Player = QBCore.Functions.GetPlayerByCitizenId(citizenid)
    if Player then
        DropPlayer(Player.PlayerData.source, reason)
        return QBAdapter.Execute("INSERT INTO bans (license, reason, expire) VALUES (@license, @reason, @expire)", {
            license = Player.PlayerData.license,
            reason = reason,
            expire = os.time() + (365 * 24 * 60 * 60) -- 1 ano
        })
    end
    return false
end

function QBAdapter.UnbanPlayer(license)
    return QBAdapter.Execute("DELETE FROM bans WHERE license = @license", {license = license})
end

-- Funções de dados do usuário
function QBAdapter.GetUserData(citizenid, key)
    local Player = QBCore.Functions.GetPlayerByCitizenId(citizenid)
    if Player then
        return Player.PlayerData[key]
    end
    return nil
end

function QBAdapter.SetUserData(citizenid, key, value)
    local Player = QBCore.Functions.GetPlayerByCitizenId(citizenid)
    if Player then
        Player.PlayerData[key] = value
        return true
    end
    return false
end

-- Funções de propriedades
function QBAdapter.GetUserProperties(citizenid)
    local result = QBAdapter.Query("SELECT * FROM player_houses WHERE citizenid = @citizenid", {citizenid = citizenid})
    local properties = {}
    
    for _, v in pairs(result) do
        table.insert(properties, {
            name = v.house,
            street = v.street or ""
        })
    end
    
    return properties
end

function QBAdapter.GiveProperty(citizenid, name)
    return QBAdapter.Execute("INSERT INTO player_houses (citizenid, house, keyholders, decorations, stash, outfit, logout) VALUES (@citizenid, @house, @keyholders, @decorations, @stash, @outfit, @logout)", {
        citizenid = citizenid,
        house = name,
        keyholders = json.encode({}),
        decorations = json.encode({}),
        stash = json.encode({}),
        outfit = json.encode({}),
        logout = json.encode({})
    })
end

function QBAdapter.RemoveProperty(citizenid, name)
    return QBAdapter.Execute("DELETE FROM player_houses WHERE citizenid = @citizenid AND house = @house", {
        citizenid = citizenid,
        house = name
    })
end

-- Funções de armadura
function QBAdapter.SetArmour(source, value)
    SetPedArmour(source, value)
    return true
end

-- Funções de notificação
function QBAdapter.Notify(source, type, title, message, duration)
    local Player = QBCore.Functions.GetPlayer(source)
    if Player then
        TriggerClientEvent('QBCore:Notify', source, message, type, duration or 5000)
    end
end

function QBAdapter.NotifyAll(type, title, message, duration)
    TriggerClientEvent('QBCore:Notify', -1, message, type, duration or 5000)
end

-- Funções de eventos
function QBAdapter.TriggerClientEvent(eventName, source, ...)
    TriggerClientEvent(eventName, source, ...)
end

function QBAdapter.TriggerServerEvent(eventName, ...)
    TriggerServerEvent(eventName, ...)
end

function QBAdapter.RegisterServerEvent(eventName, handler)
    RegisterNetEvent(eventName)
    AddEventHandler(eventName, handler)
end

function QBAdapter.RegisterClientEvent(eventName, handler)
    RegisterNetEvent(eventName)
    AddEventHandler(eventName, handler)
end

-- Funções de comandos
function QBAdapter.RegisterCommand(command, handler, restricted)
    RegisterCommand(command, handler, restricted)
end

-- Funções de NUI
function QBAdapter.SendNUIMessage(data)
    SendNUIMessage(data)
end

function QBAdapter.SetNuiFocus(hasFocus, hasCursor)
    SetNuiFocus(hasFocus, hasCursor)
end

function QBAdapter.RegisterNUICallback(callback, handler)
    RegisterNUICallback(callback, handler)
end

-- Funções de veículos (criação)
function QBAdapter.CreateVehicle(model, x, y, z, heading)
    local mHash = GetHashKey(model)
    local vehicle = CreateVehicle(mHash, x, y, z, heading, true, true)
    return vehicle
end

function QBAdapter.SpawnVehicleForPlayer(source, model, x, y, z, heading)
    local vehicle = QBAdapter.CreateVehicle(model, x, y, z, heading)
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
function QBAdapter.RepairVehicle(source)
    local vehicle = GetVehiclePedIsIn(GetPlayerPed(source), false)
    if vehicle ~= 0 then
        SetVehicleFixed(vehicle)
        SetVehicleDeformationFixed(vehicle)
        SetVehicleUndriveable(vehicle, false)
        SetVehicleEngineOn(vehicle, true, true)
    end
end

-- Funções de tuning de veículo
function QBAdapter.TuneVehicle(source)
    local vehicle = GetVehiclePedIsIn(GetPlayerPed(source), false)
    if vehicle ~= 0 then
        SetVehicleModKit(vehicle, 0)
        for i = 0, 49 do
            SetVehicleMod(vehicle, i, -1, false)
        end
    end
end

-- Funções de whitelist
function QBAdapter.SetWhitelist(citizenid, status)
    local Player = QBCore.Functions.GetPlayerByCitizenId(citizenid)
    if Player then
        return QBAdapter.Execute("UPDATE players SET whitelist = @whitelist WHERE citizenid = @citizenid", {
            whitelist = status and 1 or 0,
            citizenid = citizenid
        })
    end
    return false
end

-- Funções de salário
function QBAdapter.GiveSalary(citizenid, amount, group)
    local Player = QBCore.Functions.GetPlayerByCitizenId(citizenid)
    if Player then
        Player.Functions.AddMoney('bank', amount)
        QBAdapter.Notify(Player.PlayerData.source, 'success', 'Salário', string.format("Foi adicionado a sua conta bancária do salário do seu cargo %s no valor de %d.", group, amount), 5000)
    end
end

-- Função para gerar placa
function QBAdapter.GeneratePlate()
    local plate = ""
    local chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    for i = 1, 8 do
        plate = plate .. string.sub(chars, math.random(1, #chars), math.random(1, #chars))
    end
    return plate
end

return QBAdapter