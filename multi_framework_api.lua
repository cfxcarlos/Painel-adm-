-- API Unificada Multi-Framework
-- Sistema compatível com vRP, ESX, QBCore e Standalone

local MultiFrameworkAPI = {}
local Framework = require('framework_detector')

-- Inicialização da API
function MultiFrameworkAPI.Initialize()
    -- Aguardar o framework ser detectado
    while not Framework.GetAdapter() do
        Wait(100)
    end
    
    local adapter = Framework.GetAdapter()
    MultiFrameworkAPI.Adapter = adapter
    
    print("^2[MULTI-FRAMEWORK-API] API inicializada com sucesso^0")
    print("^2[MULTI-FRAMEWORK-API] Framework detectado: " .. Framework.Detected .. "^0")
end

-- Funções de usuário
function MultiFrameworkAPI.GetUserId(source)
    return MultiFrameworkAPI.Adapter.GetUserId(source)
end

function MultiFrameworkAPI.GetUserSource(user_id)
    return MultiFrameworkAPI.Adapter.GetUserSource(user_id)
end

function MultiFrameworkAPI.GetUserName(user_id)
    return MultiFrameworkAPI.Adapter.GetUserName(user_id)
end

function MultiFrameworkAPI.GetUserIdentity(user_id)
    return MultiFrameworkAPI.Adapter.GetUserIdentity(user_id)
end

function MultiFrameworkAPI.GetPlayers()
    return MultiFrameworkAPI.Adapter.GetPlayers()
end

function MultiFrameworkAPI.IsPlayerOnline(user_id)
    return MultiFrameworkAPI.Adapter.IsPlayerOnline(user_id)
end

-- Funções de permissões
function MultiFrameworkAPI.HasPermission(user_id, permission)
    return MultiFrameworkAPI.Adapter.HasPermission(user_id, permission)
end

function MultiFrameworkAPI.GetUserGroups(user_id)
    return MultiFrameworkAPI.Adapter.GetUserGroups(user_id)
end

function MultiFrameworkAPI.GetUserGroup(user_id)
    return MultiFrameworkAPI.Adapter.GetUserGroup(user_id)
end

function MultiFrameworkAPI.AddUserGroup(user_id, group)
    return MultiFrameworkAPI.Adapter.AddUserGroup(user_id, group)
end

function MultiFrameworkAPI.RemoveUserGroup(user_id, group)
    return MultiFrameworkAPI.Adapter.RemoveUserGroup(user_id, group)
end

function MultiFrameworkAPI.GetUsersByPermission(permission)
    return MultiFrameworkAPI.Adapter.GetUsersByPermission(permission)
end

-- Funções de inventário
function MultiFrameworkAPI.GetItems()
    return MultiFrameworkAPI.Adapter.GetItems()
end

function MultiFrameworkAPI.GetItemName(item)
    return MultiFrameworkAPI.Adapter.GetItemName(item)
end

function MultiFrameworkAPI.GiveItem(user_id, item, amount)
    return MultiFrameworkAPI.Adapter.GiveItem(user_id, item, amount)
end

function MultiFrameworkAPI.RemoveItem(user_id, item, amount)
    return MultiFrameworkAPI.Adapter.RemoveItem(user_id, item, amount)
end

function MultiFrameworkAPI.GetUserInventory(user_id)
    return MultiFrameworkAPI.Adapter.GetUserInventory(user_id)
end

-- Funções de veículos
function MultiFrameworkAPI.GetVehicles()
    return MultiFrameworkAPI.Adapter.GetVehicles()
end

function MultiFrameworkAPI.GetVehicleName(vehicle)
    return MultiFrameworkAPI.Adapter.GetVehicleName(vehicle)
end

function MultiFrameworkAPI.GetVehicleChest(vehicle)
    return MultiFrameworkAPI.Adapter.GetVehicleChest(vehicle)
end

function MultiFrameworkAPI.GetUserVehicles(user_id)
    return MultiFrameworkAPI.Adapter.GetUserVehicles(user_id)
end

function MultiFrameworkAPI.AddVehicle(user_id, vehicle, plate)
    return MultiFrameworkAPI.Adapter.AddVehicle(user_id, vehicle, plate)
end

function MultiFrameworkAPI.RemoveVehicle(user_id, vehicle, plate)
    return MultiFrameworkAPI.Adapter.RemoveVehicle(user_id, vehicle, plate)
end

-- Funções de dinheiro
function MultiFrameworkAPI.GetUserMoney(user_id)
    return MultiFrameworkAPI.Adapter.GetUserMoney(user_id)
end

function MultiFrameworkAPI.GetUserBank(user_id)
    return MultiFrameworkAPI.Adapter.GetUserBank(user_id)
end

function MultiFrameworkAPI.GiveMoney(user_id, amount)
    return MultiFrameworkAPI.Adapter.GiveMoney(user_id, amount)
end

function MultiFrameworkAPI.GiveItemMoney(user_id, amount)
    return MultiFrameworkAPI.Adapter.GiveItemMoney(user_id, amount)
end

-- Funções de banco de dados
function MultiFrameworkAPI.Prepare(query, sql)
    return MultiFrameworkAPI.Adapter.Prepare(query, sql)
end

function MultiFrameworkAPI.Query(query, params)
    return MultiFrameworkAPI.Adapter.Query(query, params)
end

function MultiFrameworkAPI.Execute(query, params)
    return MultiFrameworkAPI.Adapter.Execute(query, params)
end

-- Funções de kick/ban
function MultiFrameworkAPI.KickPlayer(user_id, reason)
    return MultiFrameworkAPI.Adapter.KickPlayer(user_id, reason)
end

function MultiFrameworkAPI.BanPlayer(user_id, reason)
    return MultiFrameworkAPI.Adapter.BanPlayer(user_id, reason)
end

function MultiFrameworkAPI.UnbanPlayer(identifier)
    return MultiFrameworkAPI.Adapter.UnbanPlayer(identifier)
end

-- Funções de dados do usuário
function MultiFrameworkAPI.GetUserData(user_id, key)
    return MultiFrameworkAPI.Adapter.GetUserData(user_id, key)
end

function MultiFrameworkAPI.SetUserData(user_id, key, value)
    return MultiFrameworkAPI.Adapter.SetUserData(user_id, key, value)
end

-- Funções de propriedades
function MultiFrameworkAPI.GetUserProperties(user_id)
    return MultiFrameworkAPI.Adapter.GetUserProperties(user_id)
end

function MultiFrameworkAPI.GiveProperty(user_id, name)
    return MultiFrameworkAPI.Adapter.GiveProperty(user_id, name)
end

function MultiFrameworkAPI.RemoveProperty(user_id, name)
    return MultiFrameworkAPI.Adapter.RemoveProperty(user_id, name)
end

-- Funções de armadura
function MultiFrameworkAPI.SetArmour(source, value)
    return MultiFrameworkAPI.Adapter.SetArmour(source, value)
end

-- Funções de notificação
function MultiFrameworkAPI.Notify(source, type, title, message, duration)
    return MultiFrameworkAPI.Adapter.Notify(source, type, title, message, duration)
end

function MultiFrameworkAPI.NotifyAll(type, title, message, duration)
    return MultiFrameworkAPI.Adapter.NotifyAll(type, title, message, duration)
end

-- Funções de eventos
function MultiFrameworkAPI.TriggerClientEvent(eventName, source, ...)
    return MultiFrameworkAPI.Adapter.TriggerClientEvent(eventName, source, ...)
end

function MultiFrameworkAPI.TriggerServerEvent(eventName, ...)
    return MultiFrameworkAPI.Adapter.TriggerServerEvent(eventName, ...)
end

function MultiFrameworkAPI.RegisterServerEvent(eventName, handler)
    return MultiFrameworkAPI.Adapter.RegisterServerEvent(eventName, handler)
end

function MultiFrameworkAPI.RegisterClientEvent(eventName, handler)
    return MultiFrameworkAPI.Adapter.RegisterClientEvent(eventName, handler)
end

-- Funções de comandos
function MultiFrameworkAPI.RegisterCommand(command, handler, restricted)
    return MultiFrameworkAPI.Adapter.RegisterCommand(command, handler, restricted)
end

-- Funções de NUI
function MultiFrameworkAPI.SendNUIMessage(data)
    return MultiFrameworkAPI.Adapter.SendNUIMessage(data)
end

function MultiFrameworkAPI.SetNuiFocus(hasFocus, hasCursor)
    return MultiFrameworkAPI.Adapter.SetNuiFocus(hasFocus, hasCursor)
end

function MultiFrameworkAPI.RegisterNUICallback(callback, handler)
    return MultiFrameworkAPI.Adapter.RegisterNUICallback(callback, handler)
end

-- Funções de veículos (criação)
function MultiFrameworkAPI.CreateVehicle(model, x, y, z, heading)
    return MultiFrameworkAPI.Adapter.CreateVehicle(model, x, y, z, heading)
end

function MultiFrameworkAPI.SpawnVehicleForPlayer(source, model, x, y, z, heading)
    return MultiFrameworkAPI.Adapter.SpawnVehicleForPlayer(source, model, x, y, z, heading)
end

-- Funções de reparo de veículo
function MultiFrameworkAPI.RepairVehicle(source)
    return MultiFrameworkAPI.Adapter.RepairVehicle(source)
end

-- Funções de tuning de veículo
function MultiFrameworkAPI.TuneVehicle(source)
    return MultiFrameworkAPI.Adapter.TuneVehicle(source)
end

-- Funções de whitelist
function MultiFrameworkAPI.SetWhitelist(user_id, status)
    return MultiFrameworkAPI.Adapter.SetWhitelist(user_id, status)
end

-- Funções de salário
function MultiFrameworkAPI.GiveSalary(user_id, amount, group)
    return MultiFrameworkAPI.Adapter.GiveSalary(user_id, amount, group)
end

-- Funções específicas do sistema de admin
function MultiFrameworkAPI.GetOnlinePlayersData()
    local players = MultiFrameworkAPI.GetPlayers()
    local playersData = {}
    
    for _, playerId in pairs(players) do
        local user_id = MultiFrameworkAPI.GetUserId(playerId)
        if user_id then
            local identity = MultiFrameworkAPI.GetUserIdentity(user_id)
            local groups = MultiFrameworkAPI.GetUserGroups(user_id)
            local group = MultiFrameworkAPI.GetUserGroup(user_id)
            local isOnline = MultiFrameworkAPI.IsPlayerOnline(user_id)
            local userPed = GetPlayerPed(playerId)
            local userHealth = math.floor((GetEntityHealth(userPed) - 100) / (GetPedMaxHealth(userPed) - 100) * 100)
            local userArmour = GetPedArmour(userPed)
            local userWallet = MultiFrameworkAPI.GetUserMoney(user_id)
            local userBank = MultiFrameworkAPI.GetUserBank(user_id)
            local userVehicles = MultiFrameworkAPI.GetUserVehicles(user_id)
            local userItems = MultiFrameworkAPI.GetUserInventory(user_id)
            local userProperties = MultiFrameworkAPI.GetUserProperties(user_id)
            
            table.insert(playersData, {
                name = MultiFrameworkAPI.GetUserName(user_id),
                id = user_id,
                image = "default_avatar.png",
                online = isOnline,
                groups = groups,
                stats = {
                    health = userHealth,
                    armour = userArmour,
                    thirst = 100, -- Valor padrão
                    hunger = 100  -- Valor padrão
                },
                gender = "male", -- Valor padrão
                phone = identity and identity.phone or "000-0000",
                role = group,
                registry = identity and identity.steam or "unknown",
                money = {
                    wallet = userWallet,
                    bank = userBank
                },
                vehicles = userVehicles,
                items = userItems,
                properties = userProperties
            })
        end
    end
    
    return playersData
end

function MultiFrameworkAPI.GetServerData()
    local objects = {}
    local vehicles = {}
    
    -- Contar objetos
    for obj in pairs(GetAllObjects()) do
        table.insert(objects, obj)
    end
    
    -- Contar veículos
    for vehicle in pairs(GetAllVehicles()) do
        table.insert(vehicles, vehicle)
    end
    
    return {
        props = #objects,
        vehicles = #vehicles
    }
end

function MultiFrameworkAPI.GetServerItems()
    local items = MultiFrameworkAPI.GetItems()
    local serverItems = {}
    
    for k, v in pairs(items) do
        table.insert(serverItems, {
            name = v.label or v.name or k,
            spawn = k,
            image = "https://cdn.blacknetwork.com.br/black_inventory/" .. k .. ".png"
        })
    end
    
    return serverItems
end

function MultiFrameworkAPI.GetServerVehicles()
    local vehicles = MultiFrameworkAPI.GetVehicles()
    local serverVehicles = {}
    
    for k, v in pairs(vehicles) do
        table.insert(serverVehicles, {
            name = v.label or v.name or k,
            spawn = k,
            image = "https://cdn.blacknetwork.com.br/conce/" .. k .. ".png",
            favorite = false,
            attributes = {
                engine = 100,
                body = 100,
                gas = 100,
                trunk = MultiFrameworkAPI.GetVehicleChest(k)
            }
        })
    end
    
    return serverVehicles
end

-- Funções de logs
function MultiFrameworkAPI.SendLog(logType, userPerformedId, userSufferedId, args)
    local userPerformed = MultiFrameworkAPI.GetUserIdentity(userPerformedId)
    local userSuffered = userSufferedId and MultiFrameworkAPI.GetUserIdentity(userSufferedId) or nil
    
    if userPerformed then
        userPerformed = {
            name = userPerformed.name or "Desconhecido",
            surname = userPerformed.name2 or "",
            id = userPerformedId
        }
    else
        userPerformed = {id = userPerformedId}
    end
    
    if userSuffered then
        userSuffered = {
            name = userSuffered.name or "Desconhecido",
            surname = userSuffered.name2 or "",
            id = userSufferedId
        }
    else
        userSuffered = {id = userSufferedId}
    end
    
    -- Aqui você pode implementar o sistema de logs específico
    print(string.format("^3[LOG] %s - Admin: %s, Target: %s^0", logType, userPerformed.name, userSuffered.name))
end

-- Inicializar automaticamente
CreateThread(function()
    Wait(2000) -- Aguardar outros recursos carregarem
    MultiFrameworkAPI.Initialize()
end)

return MultiFrameworkAPI