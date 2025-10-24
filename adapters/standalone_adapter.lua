-- Adaptador para Standalone
-- Modo sem framework - apenas FiveM nativo

local StandaloneAdapter = {}

-- Inicialização do adaptador Standalone
function StandaloneAdapter.Initialize()
    print("^3[STANDALONE-ADAPTER] Adaptador Standalone inicializado^0")
    StandaloneAdapter.isServer = IsDuplicityVersion()
end

-- Funções de usuário
function StandaloneAdapter.GetUserId(source)
    return source
end

function StandaloneAdapter.GetUserSource(user_id)
    return user_id
end

function StandaloneAdapter.GetUserName(user_id)
    return GetPlayerName(user_id) or "Desconhecido"
end

function StandaloneAdapter.GetUserIdentity(user_id)
    local identifiers = GetPlayerIdentifiers(user_id)
    local identity = {}
    
    for _, identifier in pairs(identifiers) do
        if string.sub(identifier, 1, 5) == "steam" then
            identity.steam = identifier
        elseif string.sub(identifier, 1, 6) == "license" then
            identity.license = identifier
        end
    end
    
    identity.name = GetPlayerName(user_id) or "Desconhecido"
    identity.name2 = ""
    identity.phone = "000-0000"
    
    return identity
end

function StandaloneAdapter.GetPlayers()
    local players = {}
    for _, player in pairs(GetPlayers()) do
        table.insert(players, tonumber(player))
    end
    return players
end

function StandaloneAdapter.IsPlayerOnline(user_id)
    return GetPlayerName(user_id) ~= nil
end

-- Funções de permissões
function StandaloneAdapter.HasPermission(user_id, permission)
    -- No modo standalone, verificar se o jogador está na lista de admins
    local admins = {
        [1] = true, -- Exemplo: ID 1 é admin
        [2] = true, -- Exemplo: ID 2 é admin
    }
    
    return admins[user_id] or false
end

function StandaloneAdapter.GetUserGroups(user_id)
    if StandaloneAdapter.HasPermission(user_id, "admin") then
        return {"admin"}
    end
    return {"user"}
end

function StandaloneAdapter.GetUserGroup(user_id)
    if StandaloneAdapter.HasPermission(user_id, "admin") then
        return "admin"
    end
    return "user"
end

function StandaloneAdapter.AddUserGroup(user_id, group)
    -- No modo standalone, não há sistema de grupos
    return false
end

function StandaloneAdapter.RemoveUserGroup(user_id, group)
    -- No modo standalone, não há sistema de grupos
    return false
end

function StandaloneAdapter.GetUsersByPermission(permission)
    local players = StandaloneAdapter.GetPlayers()
    local users = {}
    
    for _, playerId in pairs(players) do
        if StandaloneAdapter.HasPermission(playerId, permission) then
            table.insert(users, playerId)
        end
    end
    
    return users
end

-- Funções de inventário
function StandaloneAdapter.GetItems()
    -- Lista básica de itens para modo standalone
    return {
        ["water"] = {name = "water", label = "Água"},
        ["bread"] = {name = "bread", label = "Pão"},
        ["phone"] = {name = "phone", label = "Telefone"},
        ["dollars"] = {name = "dollars", label = "Dinheiro"},
    }
end

function StandaloneAdapter.GetItemName(item)
    local items = StandaloneAdapter.GetItems()
    return items[item] and items[item].label or item
end

function StandaloneAdapter.GiveItem(user_id, item, amount)
    -- No modo standalone, apenas simular
    print(string.format("^3[STANDALONE] Dando item %s x%d para jogador %d^0", item, amount, user_id))
    return true
end

function StandaloneAdapter.RemoveItem(user_id, item, amount)
    -- No modo standalone, apenas simular
    print(string.format("^3[STANDALONE] Removendo item %s x%d do jogador %d^0", item, amount, user_id))
    return true
end

function StandaloneAdapter.GetUserInventory(user_id)
    -- No modo standalone, retornar inventário vazio
    return {}
end

-- Funções de veículos
function StandaloneAdapter.GetVehicles()
    -- Lista básica de veículos para modo standalone
    return {
        ["adder"] = {name = "Adder", label = "Adder"},
        ["zentorno"] = {name = "Zentorno", label = "Zentorno"},
        ["t20"] = {name = "T20", label = "T20"},
        ["sultan"] = {name = "Sultan", label = "Sultan"},
    }
end

function StandaloneAdapter.GetVehicleName(vehicle)
    local vehicles = StandaloneAdapter.GetVehicles()
    return vehicles[vehicle] and vehicles[vehicle].label or vehicle
end

function StandaloneAdapter.GetVehicleChest(vehicle)
    return 50 -- Capacidade padrão
end

function StandaloneAdapter.GetUserVehicles(user_id)
    -- No modo standalone, retornar lista vazia
    return {}
end

function StandaloneAdapter.AddVehicle(user_id, vehicle, plate)
    -- No modo standalone, apenas simular
    print(string.format("^3[STANDALONE] Adicionando veículo %s para jogador %d^0", vehicle, user_id))
    return true
end

function StandaloneAdapter.RemoveVehicle(user_id, vehicle, plate)
    -- No modo standalone, apenas simular
    print(string.format("^3[STANDALONE] Removendo veículo %s do jogador %d^0", vehicle, user_id))
    return true
end

-- Funções de dinheiro
function StandaloneAdapter.GetUserMoney(user_id)
    -- No modo standalone, retornar valor padrão
    return 1000
end

function StandaloneAdapter.GetUserBank(user_id)
    -- No modo standalone, retornar valor padrão
    return 5000
end

function StandaloneAdapter.GiveMoney(user_id, amount)
    -- No modo standalone, apenas simular
    print(string.format("^3[STANDALONE] Dando $%d para jogador %d^0", amount, user_id))
    return true
end

function StandaloneAdapter.GiveItemMoney(user_id, amount)
    -- No modo standalone, apenas simular
    print(string.format("^3[STANDALONE] Dando $%d em dinheiro para jogador %d^0", amount, user_id))
    return true
end

-- Funções de banco de dados
function StandaloneAdapter.Prepare(query, sql)
    -- No modo standalone, não há banco de dados
    return function(params) return {} end
end

function StandaloneAdapter.Query(query, params)
    -- No modo standalone, retornar resultado vazio
    return {}
end

function StandaloneAdapter.Execute(query, params)
    -- No modo standalone, apenas simular
    print(string.format("^3[STANDALONE] Executando query: %s^0", query))
    return true
end

-- Funções de kick/ban
function StandaloneAdapter.KickPlayer(user_id, reason)
    DropPlayer(user_id, reason)
    return true
end

function StandaloneAdapter.BanPlayer(user_id, reason)
    DropPlayer(user_id, reason)
    print(string.format("^1[STANDALONE] Jogador %d foi banido: %s^0", user_id, reason))
    return true
end

function StandaloneAdapter.UnbanPlayer(identifier)
    -- No modo standalone, apenas simular
    print(string.format("^3[STANDALONE] Desbanindo jogador: %s^0", identifier))
    return true
end

-- Funções de dados do usuário
function StandaloneAdapter.GetUserData(user_id, key)
    -- No modo standalone, retornar dados padrão
    return "default_value"
end

function StandaloneAdapter.SetUserData(user_id, key, value)
    -- No modo standalone, apenas simular
    print(string.format("^3[STANDALONE] Definindo %s = %s para jogador %d^0", key, tostring(value), user_id))
    return true
end

-- Funções de propriedades
function StandaloneAdapter.GetUserProperties(user_id)
    -- No modo standalone, retornar lista vazia
    return {}
end

function StandaloneAdapter.GiveProperty(user_id, name)
    -- No modo standalone, apenas simular
    print(string.format("^3[STANDALONE] Dando propriedade %s para jogador %d^0", name, user_id))
    return true
end

function StandaloneAdapter.RemoveProperty(user_id, name)
    -- No modo standalone, apenas simular
    print(string.format("^3[STANDALONE] Removendo propriedade %s do jogador %d^0", name, user_id))
    return true
end

-- Funções de armadura
function StandaloneAdapter.SetArmour(source, value)
    SetPedArmour(source, value)
    return true
end

-- Funções de notificação
function StandaloneAdapter.Notify(source, type, title, message, duration)
    TriggerClientEvent('chat:addMessage', source, {
        color = {255, 255, 255},
        multiline = true,
        args = {title, message}
    })
end

function StandaloneAdapter.NotifyAll(type, title, message, duration)
    TriggerClientEvent('chat:addMessage', -1, {
        color = {255, 255, 255},
        multiline = true,
        args = {title, message}
    })
end

-- Funções de eventos
function StandaloneAdapter.TriggerClientEvent(eventName, source, ...)
    TriggerClientEvent(eventName, source, ...)
end

function StandaloneAdapter.TriggerServerEvent(eventName, ...)
    TriggerServerEvent(eventName, ...)
end

function StandaloneAdapter.RegisterServerEvent(eventName, handler)
    RegisterNetEvent(eventName)
    AddEventHandler(eventName, handler)
end

function StandaloneAdapter.RegisterClientEvent(eventName, handler)
    RegisterNetEvent(eventName)
    AddEventHandler(eventName, handler)
end

-- Funções de comandos
function StandaloneAdapter.RegisterCommand(command, handler, restricted)
    RegisterCommand(command, handler, restricted)
end

-- Funções de NUI
function StandaloneAdapter.SendNUIMessage(data)
    SendNUIMessage(data)
end

function StandaloneAdapter.SetNuiFocus(hasFocus, hasCursor)
    SetNuiFocus(hasFocus, hasCursor)
end

function StandaloneAdapter.RegisterNUICallback(callback, handler)
    RegisterNUICallback(callback, handler)
end

-- Funções de veículos (criação)
function StandaloneAdapter.CreateVehicle(model, x, y, z, heading)
    local mHash = GetHashKey(model)
    local vehicle = CreateVehicle(mHash, x, y, z, heading, true, true)
    return vehicle
end

function StandaloneAdapter.SpawnVehicleForPlayer(source, model, x, y, z, heading)
    local vehicle = StandaloneAdapter.CreateVehicle(model, x, y, z, heading)
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
function StandaloneAdapter.RepairVehicle(source)
    local vehicle = GetVehiclePedIsIn(GetPlayerPed(source), false)
    if vehicle ~= 0 then
        SetVehicleFixed(vehicle)
        SetVehicleDeformationFixed(vehicle)
        SetVehicleUndriveable(vehicle, false)
        SetVehicleEngineOn(vehicle, true, true)
    end
end

-- Funções de tuning de veículo
function StandaloneAdapter.TuneVehicle(source)
    local vehicle = GetVehiclePedIsIn(GetPlayerPed(source), false)
    if vehicle ~= 0 then
        SetVehicleModKit(vehicle, 0)
        for i = 0, 49 do
            SetVehicleMod(vehicle, i, -1, false)
        end
    end
end

-- Funções de whitelist
function StandaloneAdapter.SetWhitelist(user_id, status)
    -- No modo standalone, não há sistema de whitelist
    print(string.format("^3[STANDALONE] Definindo whitelist %s para jogador %d^0", tostring(status), user_id))
    return true
end

-- Funções de salário
function StandaloneAdapter.GiveSalary(user_id, amount, group)
    StandaloneAdapter.GiveMoney(user_id, amount)
    StandaloneAdapter.Notify(user_id, "success", "Salário", string.format("Foi adicionado a sua conta bancária do salário do seu cargo %s no valor de %d.", group, amount), 5000)
end

return StandaloneAdapter