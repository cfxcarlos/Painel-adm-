-- Adaptador para VRP da Base Personalizada (vrp_net)
-- Compatível com VRP customizado da sua base

local VRPNetAdapter = {}

-- Inicialização do adaptador VRP Net
function VRPNetAdapter.Initialize()
    local Tunnel = module("vrp_net", "lib/Tunnel")
    local Proxy = module("vrp_net", "lib/Proxy")
    
    if IsDuplicityVersion() then
        -- Servidor
        vRPC = Tunnel.getInterface("vRP")
        vRP = Proxy.getInterface("vRP")
        VRPNetAdapter.isServer = true
    else
        -- Cliente
        vRP = Proxy.getInterface("vRP")
        VRPNetAdapter.isServer = false
    end
    
    print("^2[VRP-NET-ADAPTER] Adaptador VRP Net inicializado^0")
end

-- Funções de usuário
function VRPNetAdapter.GetUserId(source)
    return vRP.getUserId(source)
end

function VRPNetAdapter.GetUserSource(user_id)
    return vRP.userSource(user_id)
end

function VRPNetAdapter.GetUserName(user_id)
    local identity = vRP.userIdentity(user_id)
    if identity then
        return identity.name .. " " .. identity.name2
    end
    return "Desconhecido"
end

function VRPNetAdapter.GetUserIdentity(user_id)
    return vRP.userIdentity(user_id)
end

function VRPNetAdapter.GetPlayers()
    return vRP.getPlayersOn()
end

function VRPNetAdapter.IsPlayerOnline(user_id)
    return vRP.userSource(user_id) ~= nil
end

-- Funções de permissões
function VRPNetAdapter.HasPermission(user_id, permission)
    return vRP.hasGroup(user_id, permission)
end

function VRPNetAdapter.GetUserGroups(user_id)
    local groups = vRP.Groups()
    local userGroups = {}
    
    for permission, _ in pairs(groups) do
        local data = vRP.DataGroups(permission)
        if data[tostring(user_id)] then
            table.insert(userGroups, permission)
        end
    end
    
    return userGroups
end

function VRPNetAdapter.GetUserGroup(user_id)
    local groups = vRP.Groups()
    for permission, _ in pairs(groups) do
        local data = vRP.DataGroups(permission)
        if data[tostring(user_id)] then
            return permission
        end
    end
    return "user"
end

function VRPNetAdapter.AddUserGroup(user_id, group)
    return vRP.setPermission(user_id, group)
end

function VRPNetAdapter.RemoveUserGroup(user_id, group)
    return vRP.remPermission(user_id, group)
end

function VRPNetAdapter.GetUsersByPermission(permission)
    return vRP.getUsersByPermission(permission)
end

-- Funções de inventário
function VRPNetAdapter.GetItems()
    return itemList()
end

function VRPNetAdapter.GetItemName(item)
    return itemName(item)
end

function VRPNetAdapter.GiveItem(user_id, item, amount)
    return vRP.giveInventoryItem(user_id, item, amount, true)
end

function VRPNetAdapter.RemoveItem(user_id, item, amount)
    return vRP.tryGetInventoryItem(user_id, item, amount)
end

function VRPNetAdapter.GetUserInventory(user_id)
    local data = vRP.getDatatable(user_id)
    local inventory = {}
    
    if data and data.inventory then
        for item, amount in pairs(data.inventory) do
            table.insert(inventory, {
                item = item,
                amount = amount,
                name = VRPNetAdapter.GetItemName(item)
            })
        end
    end
    
    return inventory
end

-- Funções de veículos
function VRPNetAdapter.GetVehicles()
    return vehicleGlobal()
end

function VRPNetAdapter.GetVehicleName(vehicle)
    return vehicleName(vehicle)
end

function VRPNetAdapter.GetVehicleChest(vehicle)
    return vehicleChest(vehicle)
end

function VRPNetAdapter.GetUserVehicles(user_id)
    local data = vRP.query("SELECT * FROM vehicles WHERE user_id = @user_id", {user_id = user_id})
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

function VRPNetAdapter.AddVehicle(user_id, vehicle, plate)
    return vRP.execute("INSERT IGNORE INTO vehicles(user_id,vehicle,plate,work,rental,tax) VALUES(@user_id,@vehicle,@plate,@work,UNIX_TIMESTAMP() + @rentalDays,UNIX_TIMESTAMP() + 604800)", {
        user_id = user_id,
        vehicle = vehicle,
        plate = plate or vRP.generatePlate(),
        work = "false",
        rentalDays = 0
    })
end

function VRPNetAdapter.RemoveVehicle(user_id, vehicle, plate)
    return vRP.execute("DELETE FROM vehicles WHERE user_id = @user_id AND vehicle = @vehicle AND plate = @plate", {
        user_id = user_id,
        vehicle = vehicle,
        plate = plate
    })
end

-- Funções de dinheiro
function VRPNetAdapter.GetUserMoney(user_id)
    return vRP.itemAmount(user_id, "dollars")
end

function VRPNetAdapter.GetUserBank(user_id)
    return vRP.getBank(user_id)
end

function VRPNetAdapter.GiveMoney(user_id, amount)
    return vRP.addBank(user_id, amount)
end

function VRPNetAdapter.GiveItemMoney(user_id, amount)
    return vRP.giveInventoryItem(user_id, "dollars", amount, true)
end

-- Funções de banco de dados
function VRPNetAdapter.Prepare(query, sql)
    return vRP.prepare(query, sql)
end

function VRPNetAdapter.Query(query, params)
    return vRP.query(query, params)
end

function VRPNetAdapter.Execute(query, params)
    return vRP.execute(query, params)
end

-- Funções de kick/ban
function VRPNetAdapter.KickPlayer(user_id, reason)
    return vRP.kick(user_id, reason)
end

function VRPNetAdapter.BanPlayer(user_id, reason)
    local identity = vRP.userIdentity(user_id)
    if identity then
        vRP.kick(user_id, reason)
        return vRP.execute("banneds/insertBanned", {steam = identity.steam})
    end
    return false
end

function VRPNetAdapter.UnbanPlayer(steam)
    return vRP.execute("banneds/removeBanned", {steam = steam})
end

-- Funções de dados do usuário
function VRPNetAdapter.GetUserData(user_id, key)
    return vRP.userData(user_id, key)
end

function VRPNetAdapter.SetUserData(user_id, key, value)
    return vRP.execute("playerdata/setUserdata", {user_id = user_id, key = key, value = value})
end

-- Funções de propriedades
function VRPNetAdapter.GetUserProperties(user_id)
    local data = vRP.query("SELECT * FROM propertys WHERE user_id = @user_id", {user_id = user_id})
    local properties = {}
    
    for _, v in pairs(data) do
        table.insert(properties, {
            name = v.name,
            street = v.street or ""
        })
    end
    
    return properties
end

function VRPNetAdapter.GiveProperty(user_id, name)
    return vRP.execute("propertys/Buy", {
        name = name,
        interior = "Diamond",
        user_id = user_id,
        price = 100000,
        vault = 100.00,
        fridge = 100.00,
        tax = os.time() + 2592000,
        owner = 1
    })
end

function VRPNetAdapter.RemoveProperty(user_id, name)
    return vRP.execute("black/removeUserProperty", {user_id = user_id, name = name})
end

-- Funções de armadura
function VRPNetAdapter.SetArmour(source, value)
    return vRP.setArmour(source, value)
end

-- Funções de notificação
function VRPNetAdapter.Notify(source, type, title, message, duration)
    TriggerClientEvent("Notify", source, type, title, message, duration or 5000)
end

function VRPNetAdapter.NotifyAll(type, title, message, duration)
    TriggerClientEvent("Notify", -1, type, title, message, duration or 5000)
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
function VRPNetAdapter.TuneVehicle(source)
    TriggerClientEvent("admin:vehicleTuning", source)
end

-- Funções de whitelist
function VRPNetAdapter.SetWhitelist(user_id, status)
    local identity = vRP.userIdentity(user_id)
    if identity then
        return vRP.execute("accounts/setwl", {whitelist = status and 1 or 0, id = user_id})
    end
    return false
end

-- Funções de salário
function VRPNetAdapter.GiveSalary(user_id, amount, group)
    local userSource = VRPNetAdapter.GetUserSource(user_id)
    if user_id and userSource then
        vRP.addBank(user_id, amount)
        VRPNetAdapter.Notify(userSource, "verde", "Salário", string.format("Foi adicionado a sua conta bancária do salário do seu cargo %s no valor de %d.", group, amount), 5000)
    end
end

return VRPNetAdapter
