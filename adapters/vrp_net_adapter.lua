-- Adaptador para vRP Net
-- Compatível com vRP Net Framework (Creative Network)

local VRPNetAdapter = {}
local vRP = nil
local vRPC = nil
local tvRP = nil
local Proxy = nil
local Tunnel = nil

-- Inicialização do adaptador vRP Net
function VRPNetAdapter.Initialize()
    -- Carregar módulos do vrp_net
    Proxy = module("vrp_net", "lib/Proxy")
    Tunnel = module("vrp_net", "lib/Tunnel")
    
    if IsDuplicityVersion() then
        -- Servidor
        vRPC = Tunnel.getInterface("vRP")
        vRP = Proxy.getInterface("vRP")
        VRPNetAdapter.isServer = true
    else
        -- Cliente
        vRP = Proxy.getInterface("vRP")
        tvRP = Tunnel.getInterface("vRP")
        VRPNetAdapter.isServer = false
    end
    
    print("^2[VRP-NET-ADAPTER] Adaptador vRP Net inicializado^0")
end

-- Funções de usuário
function VRPNetAdapter.GetUserId(source)
    if VRPNetAdapter.isServer then
        -- No servidor, usar a função do vRP Net
        return vRP.Passport(source)
    else
        -- No cliente, obter do estado do jogador
        return LocalPlayer.state.Passport
    end
end

function VRPNetAdapter.GetUserSource(passport)
    if VRPNetAdapter.isServer then
        return vRP.Source(passport)
    else
        return GetPlayerServerId(PlayerId())
    end
end

function VRPNetAdapter.GetUserName(passport)
    if VRPNetAdapter.isServer then
        local identity = vRP.Identity(passport)
        if identity then
            return identity.name .. " " .. identity.name2
        end
    else
        local identity = LocalPlayer.state.Identity
        if identity then
            return identity.name .. " " .. identity.name2
        end
    end
    return "Desconhecido"
end

function VRPNetAdapter.GetUserIdentity(passport)
    if VRPNetAdapter.isServer then
        return vRP.Identity(passport)
    else
        return LocalPlayer.state.Identity
    end
end

function VRPNetAdapter.GetPlayers()
    if VRPNetAdapter.isServer then
        return vRP.Players()
    else
        local players = {}
        local gamePool = GetGamePool("CPed")
        for _, entity in pairs(gamePool) do
            local index = NetworkGetPlayerIndexFromPed(entity)
            if IsPedAPlayer(entity) and index and NetworkIsPlayerConnected(index) then
                table.insert(players, GetPlayerServerId(index))
            end
        end
        return players
    end
end

function VRPNetAdapter.IsPlayerOnline(passport)
    if VRPNetAdapter.isServer then
        return vRP.Source(passport) ~= nil
    else
        return LocalPlayer.state.Passport == passport
    end
end

-- Funções de permissões
function VRPNetAdapter.HasPermission(passport, permission)
    if VRPNetAdapter.isServer then
        return vRP.HasService(passport, permission)
    else
        return LocalPlayer.state[permission] == true
    end
end

function VRPNetAdapter.GetUserGroups(passport)
    local groups = {}
    if VRPNetAdapter.isServer then
        -- Obter grupos do servidor
        for groupName, groupData in pairs(Groups) do
            if VRPNetAdapter.HasPermission(passport, groupName) then
                table.insert(groups, groupName)
            end
        end
    else
        -- Obter grupos do cliente
        for groupName, _ in pairs(Groups) do
            if LocalPlayer.state[groupName] then
                table.insert(groups, groupName)
            end
        end
    end
    return groups
end

function VRPNetAdapter.GetUserGroup(passport)
    local groups = VRPNetAdapter.GetUserGroups(passport)
    return groups[1] or "user"
end

function VRPNetAdapter.AddUserGroup(passport, group)
    if VRPNetAdapter.isServer then
        return vRP.SetService(passport, group, true)
    end
    return false
end

function VRPNetAdapter.RemoveUserGroup(passport, group)
    if VRPNetAdapter.isServer then
        return vRP.SetService(passport, group, false)
    end
    return false
end

function VRPNetAdapter.GetUsersByPermission(permission)
    if VRPNetAdapter.isServer then
        return vRP.GetUsersByService(permission)
    end
    return {}
end

-- Funções de inventário
function VRPNetAdapter.GetItems()
    return ListItem or {}
end

function VRPNetAdapter.GetItemName(item)
    local itemData = ListItem[item]
    return itemData and itemData.name or item
end

function VRPNetAdapter.GiveItem(passport, item, amount)
    if VRPNetAdapter.isServer then
        return vRP.GiveItem(passport, item, amount)
    end
    return false
end

function VRPNetAdapter.RemoveItem(passport, item, amount)
    if VRPNetAdapter.isServer then
        return vRP.RemoveItem(passport, item, amount)
    end
    return false
end

function VRPNetAdapter.GetUserInventory(passport)
    if VRPNetAdapter.isServer then
        return vRP.Inventory(passport)
    else
        return LocalPlayer.state.Inventory or {}
    end
end

-- Funções de veículos
function VRPNetAdapter.GetVehicles()
    return ListVehicle or {}
end

function VRPNetAdapter.GetVehicleName(vehicle)
    local vehicleData = ListVehicle[vehicle]
    return vehicleData and vehicleData.name or vehicle
end

function VRPNetAdapter.GetVehicleChest(vehicle)
    local vehicleData = ListVehicle[vehicle]
    return vehicleData and vehicleData.chest or 0
end

function VRPNetAdapter.GetUserVehicles(passport)
    if VRPNetAdapter.isServer then
        local result = VRPNetAdapter.Query("SELECT * FROM vehicles WHERE passport = @passport", {passport = passport})
        local vehicles = {}
        
        for _, v in pairs(result) do
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
    return {}
end

function VRPNetAdapter.AddVehicle(passport, vehicle, plate)
    if VRPNetAdapter.isServer then
        return VRPNetAdapter.Execute("INSERT INTO vehicles (passport, vehicle, plate, engine, body, gas, trunk) VALUES (@passport, @vehicle, @plate, @engine, @body, @gas, @trunk)", {
            passport = passport,
            vehicle = vehicle,
            plate = plate or VRPNetAdapter.GeneratePlate(),
            engine = 100,
            body = 100,
            gas = 100,
            trunk = 0
        })
    end
    return false
end

function VRPNetAdapter.RemoveVehicle(passport, vehicle, plate)
    if VRPNetAdapter.isServer then
        return VRPNetAdapter.Execute("DELETE FROM vehicles WHERE passport = @passport AND plate = @plate", {
            passport = passport,
            plate = plate
        })
    end
    return false
end

-- Funções de dinheiro
function VRPNetAdapter.GetUserMoney(passport)
    if VRPNetAdapter.isServer then
        return vRP.ItemAmount(passport, "dollar")
    else
        return LocalPlayer.state.Money or 0
    end
end

function VRPNetAdapter.GetUserBank(passport)
    if VRPNetAdapter.isServer then
        return vRP.Bank(passport)
    else
        return LocalPlayer.state.Bank or 0
    end
end

function VRPNetAdapter.GiveMoney(passport, amount)
    if VRPNetAdapter.isServer then
        return vRP.GiveBank(passport, amount)
    end
    return false
end

function VRPNetAdapter.GiveItemMoney(passport, amount)
    if VRPNetAdapter.isServer then
        return vRP.GiveItem(passport, "dollar", amount)
    end
    return false
end

-- Funções de banco de dados
function VRPNetAdapter.Prepare(query, sql)
    if VRPNetAdapter.isServer then
        return vRP.Prepare(query, sql)
    end
    return nil
end

function VRPNetAdapter.Query(query, params)
    if VRPNetAdapter.isServer then
        return vRP.Query(query, params)
    end
    return {}
end

function VRPNetAdapter.Execute(query, params)
    if VRPNetAdapter.isServer then
        return vRP.Execute(query, params)
    end
    return false
end

-- Funções de kick/ban
function VRPNetAdapter.KickPlayer(passport, reason)
    if VRPNetAdapter.isServer then
        local source = VRPNetAdapter.GetUserSource(passport)
        if source then
            DropPlayer(source, reason)
            return true
        end
    end
    return false
end

function VRPNetAdapter.BanPlayer(passport, reason)
    if VRPNetAdapter.isServer then
        local identity = VRPNetAdapter.GetUserIdentity(passport)
        if identity then
            VRPNetAdapter.KickPlayer(passport, reason)
            return VRPNetAdapter.Execute("INSERT INTO banneds (steam, reason, expire) VALUES (@steam, @reason, @expire)", {
                steam = identity.steam,
                reason = reason,
                expire = os.time() + (365 * 24 * 60 * 60) -- 1 ano
            })
        end
    end
    return false
end

function VRPNetAdapter.UnbanPlayer(steam)
    if VRPNetAdapter.isServer then
        return VRPNetAdapter.Execute("DELETE FROM banneds WHERE steam = @steam", {steam = steam})
    end
    return false
end

-- Funções de dados do usuário
function VRPNetAdapter.GetUserData(passport, key)
    if VRPNetAdapter.isServer then
        return vRP.UserData(passport, key)
    else
        return LocalPlayer.state[key]
    end
end

function VRPNetAdapter.SetUserData(passport, key, value)
    if VRPNetAdapter.isServer then
        return vRP.SetUserData(passport, key, value)
    end
    return false
end

-- Funções de propriedades
function VRPNetAdapter.GetUserProperties(passport)
    if VRPNetAdapter.isServer then
        local result = VRPNetAdapter.Query("SELECT * FROM propertys WHERE passport = @passport", {passport = passport})
        local properties = {}
        
        for _, v in pairs(result) do
            table.insert(properties, {
                name = v.name,
                street = v.street or ""
            })
        end
        
        return properties
    end
    return {}
end

function VRPNetAdapter.GiveProperty(passport, name)
    if VRPNetAdapter.isServer then
        return VRPNetAdapter.Execute("INSERT INTO propertys (passport, name, street, price, vault, fridge, tax, owner) VALUES (@passport, @name, @street, @price, @vault, @fridge, @tax, @owner)", {
            passport = passport,
            name = name,
            street = "",
            price = 100000,
            vault = 100.00,
            fridge = 100.00,
            tax = os.time() + 2592000,
            owner = 1
        })
    end
    return false
end

function VRPNetAdapter.RemoveProperty(passport, name)
    if VRPNetAdapter.isServer then
        return VRPNetAdapter.Execute("DELETE FROM propertys WHERE passport = @passport AND name = @name", {
            passport = passport,
            name = name
        })
    end
    return false
end

-- Funções de armadura
function VRPNetAdapter.SetArmour(source, value)
    if VRPNetAdapter.isServer then
        return vRP.SetArmour(source, value)
    else
        SetPedArmour(PlayerPedId(), value)
        return true
    end
end

-- Funções de notificação
function VRPNetAdapter.Notify(source, type, title, message, duration)
    if VRPNetAdapter.isServer then
        TriggerClientEvent("Notify", source, type, title, message, duration or 5000)
    else
        -- Implementar sistema de notificação do vRP Net
        SendNUIMessage({
            type = "notification",
            data = {
                type = type,
                title = title,
                message = message,
                duration = duration or 5000
            }
        })
    end
end

function VRPNetAdapter.NotifyAll(type, title, message, duration)
    if VRPNetAdapter.isServer then
        TriggerClientEvent("Notify", -1, type, title, message, duration or 5000)
    end
end

-- Funções de eventos
function VRPNetAdapter.TriggerClientEvent(eventName, source, ...)
    TriggerClientEvent(eventName, source, ...)
end

function VRPNetAdapter.TriggerServerEvent(eventName, ...)
    TriggerServerEvent(eventName, ...)
end

function VRPNetAdapter.RegisterServerEvent(eventName, handler)
    RegisterNetEvent(eventName)
    AddEventHandler(eventName, handler)
end

function VRPNetAdapter.RegisterClientEvent(eventName, handler)
    RegisterNetEvent(eventName)
    AddEventHandler(eventName, handler)
end

-- Funções de comandos
function VRPNetAdapter.RegisterCommand(command, handler, restricted)
    RegisterCommand(command, handler, restricted)
end

-- Funções de NUI
function VRPNetAdapter.SendNUIMessage(data)
    SendNUIMessage(data)
end

function VRPNetAdapter.SetNuiFocus(hasFocus, hasCursor)
    SetNuiFocus(hasFocus, hasCursor)
end

function VRPNetAdapter.RegisterNUICallback(callback, handler)
    RegisterNUICallback(callback, handler)
end

-- Funções de veículos (criação)
function VRPNetAdapter.CreateVehicle(model, x, y, z, heading)
    local mHash = GetHashKey(model)
    local vehicle = CreateVehicle(mHash, x, y, z, heading, true, true)
    return vehicle
end

function VRPNetAdapter.SpawnVehicleForPlayer(source, model, x, y, z, heading)
    local vehicle = VRPNetAdapter.CreateVehicle(model, x, y, z, heading)
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
function VRPNetAdapter.RepairVehicle(source)
    if VRPNetAdapter.isServer and vRPC then
        local vehicle, vehNet, vehPlate = vRPC.VehList(source, 4)
        if vehicle then
            local activePlayers = vRPC.ActivePlayers(source)
            for _, v in pairs(activePlayers) do
                TriggerClientEvent("inventory:repairAdmin", v, vehNet, vehPlate)
            end
        end
    else
        local vehicle = GetVehiclePedIsIn(GetPlayerPed(source), false)
        if vehicle ~= 0 then
            SetVehicleFixed(vehicle)
            SetVehicleDeformationFixed(vehicle)
            SetVehicleUndriveable(vehicle, false)
            SetVehicleEngineOn(vehicle, true, true)
        end
    end
end

-- Funções de tuning de veículo
function VRPNetAdapter.TuneVehicle(source)
    TriggerClientEvent("admin:vehicleTuning", source)
end

-- Funções de whitelist
function VRPNetAdapter.SetWhitelist(passport, status)
    if VRPNetAdapter.isServer then
        return VRPNetAdapter.Execute("UPDATE accounts SET whitelist = @whitelist WHERE passport = @passport", {
            whitelist = status and 1 or 0,
            passport = passport
        })
    end
    return false
end

-- Funções de salário
function VRPNetAdapter.GiveSalary(passport, amount, group)
    local userSource = VRPNetAdapter.GetUserSource(passport)
    if passport and userSource then
        VRPNetAdapter.GiveMoney(passport, amount)
        VRPNetAdapter.Notify(userSource, "verde", "Salário", string.format("Foi adicionado a sua conta bancária do salário do seu cargo %s no valor de %d.", group, amount), 5000)
    end
end

-- Função para gerar placa
function VRPNetAdapter.GeneratePlate()
    local plate = ""
    local chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789"
    for i = 1, 8 do
        plate = plate .. string.sub(chars, math.random(1, #chars), math.random(1, #chars))
    end
    return plate
end

-- Funções específicas do vRP Net
function VRPNetAdapter.GetPhone(passport)
    if VRPNetAdapter.isServer then
        return vRP.Phone(passport)
    end
    return "Inativo"
end

function VRPNetAdapter.ClearInventory(passport, ignore)
    if VRPNetAdapter.isServer then
        return vRP.ClearInventory(passport, ignore)
    end
    return false
end

function VRPNetAdapter.Request(source, title, message)
    if VRPNetAdapter.isServer then
        return vRP.Request(source, title, message)
    end
    return false
end

function VRPNetAdapter.Revive(source, health, arena)
    if VRPNetAdapter.isServer then
        return vRP.Revive(source, health, arena)
    end
    return false
end

function VRPNetAdapter.Task(source, amount, speed)
    if VRPNetAdapter.isServer then
        return vRP.Task(source, amount, speed)
    end
    return false
end

function VRPNetAdapter.Device(source, seconds)
    if VRPNetAdapter.isServer then
        return vRP.Device(source, seconds)
    end
    return false
end

function VRPNetAdapter.LetterGame(source, duration, speed)
    if VRPNetAdapter.isServer then
        return vRP.LetterGame(source, duration, speed)
    end
    return false
end

return VRPNetAdapter