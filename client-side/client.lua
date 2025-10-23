local serverItems    = {}
local serverVehicles = {}

function executeCommand(command,args,tunnel)
    if not args or args == '' then 
        if tunnel == "client" then 
            print("TriggerEvent - sem args") -- Log para debugging
            TriggerEvent("black_admin:"..command)
        else
            print("TriggerServerEvent - sem args") -- Log para debugging
            TriggerServerEvent("black_admin:"..command)
        end
    else
        if tunnel == "client" then 
            print("TriggerEvent - com args") -- Log para debugging
            TriggerEvent("black_admin:"..command,args)
        else
            print("TriggerServerEvent - com args") -- Log para debugging
            TriggerServerEvent("black_admin:"..command,args)
        end
    end
end

function enumerateObjects()
    return enumerateEntities(FindFirstObject, FindNextObject, EndFindObject)
end

function enumerateVehicles()
    return enumerateEntities(FindFirstVehicle, FindNextVehicle, EndFindVehicle)
end

function enumerateEntities(initFunc, moveFunc, disposeFunc)
    return coroutine.wrap(function()
        local handle, entity = initFunc()
        if not entity or entity == 0 then
            disposeFunc(handle)
            return
        end

        local enum = {handle = handle, destructor = disposeFunc}
        setmetatable(enum, entityEnumerator)

        local next = true
        repeat
            coroutine.yield(entity)
            next, entity = moveFunc(handle)
        until not next

        enum.destructor, enum.handle = nil, nil
        disposeFunc(handle)
    end)
end

local entityEnumerator = {
    __gc = function(enum)
        if enum.handle then
            enum.destructor(enum.handle)
        end
        enum.destructor = nil
        enum.handle = nil
    end
}

RegisterNUICallback("getUserData",function(data,cb)
    local data = serverAPI.getUser()
    cb(data)
end)

RegisterNUICallback("getOnlinePlayers",function(data,cb)
    local data = serverAPI.getUsers()
    cb(data)
end)

RegisterNUICallback("getObjects",function(data,cb)
    local data = serverAPI.getServerData()
    cb(data)
end)

RegisterNUICallback("getServerItems",function(data,cb)
    cb(serverItems)
end)

RegisterNUICallback("getItem",function(data,cb)
    serverAPI.getItem(false,data.item.spawn,false)
end)

RegisterNUICallback("giveItemsToId",function(data,cb)
    serverAPI.getItem(data.id,data.item.spawn,data.quantity)
end)

RegisterNUICallback("giveItemToUser",function(data,cb)
    serverAPI.getItem(data.user.id,data.spawn,data.quantity)
end)

RegisterNUICallback("getServerVehicles",function(data,cb)
    cb(serverVehicles)
end)

RegisterNUICallback("spawnVehicle",function(data,cb)
    serverAPI.spawnVehicle(data.vehicle.spawn)
end)

RegisterNUICallback("addVehicleToUser",function(data,cb)
    serverAPI.addVehicleToUser(data.vehicle.spawn,data.id,data.duration)
end)

RegisterNUICallback("removeVehicleFromUser",function(data,cb)
    serverAPI.removeVehicleFromUser(data.vehicle.spawn,data.vehicle.plate,data.user.id)
end)

RegisterNUICallback("getCommands",function(data,cb)
    cb(Config.commands)
end)

RegisterNUICallback("executeCommand",function(data,cb)
    if data.type == "button" then 
        executeCommand(data.event,false,data.tunnel)
    elseif data.type == "input" then 
        executeCommand(data.event,data.content,data.tunnel)
    end
end)

RegisterNUICallback("getOnlinePlayersData",function(data,cb)
    local data = serverAPI.getOnlinePlayersData()
    cb(data)
end)

RegisterNUICallback("addUserGroup",function(data,cb)
    local data = serverAPI.addUserGroup(data.id,data.role)
    cb(data)
end)

RegisterNUICallback("removeUserGroup",function(data,cb)
    local data = serverAPI.remUserGroup(data.id,data.role)
    cb(data)
end)

RegisterNUICallback("getSalaries",function(data,cb)
    local data = serverAPI.getSalaries()
    cb(data)
end)

RegisterNUICallback("addNewSalary",function(data,cb)
    serverAPI.addNewSalary(data.name,data.group,data.newSalary)
end)

RegisterNUICallback("removeSalary",function(data,cb)
    serverAPI.removeSalary(data.name)
end)

RegisterNUICallback("setNewSalary",function(data,cb)
    serverAPI.setNewSalary(data.group,data.newSalary)
end)

RegisterNUICallback("sendChatMessage",function(data,cb)
    serverAPI.sendChatMessage(data.content)
end)

RegisterNUICallback("getAllNotifications",function(data,cb)
    local notificationsData = serverAPI.getNotifications()
    cb(notificationsData)
end)

RegisterNUICallback("saveMessage",function(data,cb)
    local status,notificationsData = serverAPI.saveNotification(data.message)
    if status then cb(notificationsData) end 
end)

RegisterNUICallback("deleteMessage",function(data,cb)
    local status,notificationsData = serverAPI.deleteNotification(data.notifyId)
    if status then cb(notificationsData) end 
end) 

RegisterNUICallback("removeItemFromUser",function(data,cb)
    serverAPI.removeItemFromUser(data.item.spawn,data.user.id)
end)

RegisterNUICallback("removePropertyFromUser",function(data,cb)
    serverAPI.removeProperty(data.user.id,data.property.name)
end)

RegisterNUICallback("givePropertyToUser",function(data,cb)
    serverAPI.giveProperty(data.user.id,data.spawn)
end)

RegisterNUICallback("getOnlinePlayersData",function(data,cb)
    local data = serverAPI.getOnlinePlayersData()
    cb(data)
end)

RegisterNUICallback("getGroupPlayersList",function(data,cb)
    local data = serverAPI.groupPlayersList()
    cb(data)
end)

RegisterNUICallback("giveMoneyToUser",function(data,cb)
    serverAPI.giveMoneyToUser(data.user.id,data.quantity)
end)

RegisterNUICallback("giveVehicleToUser",function(data,cb)
    serverAPI.addVehicleToUser(data.spawn,data.user.id,data.time)
end)

RegisterNUICallback("playerAction",function(data,cb)
    serverAPI.playerActions(data.player.id,data.action)
end)

RegisterNUICallback("banUser",function(data,cb)
    serverAPI.banUser(data.user.id,data.time)
end)

RegisterNUICallback("setUserImage",function(data,cb)
    local status = serverAPI.setUserData(data)
    if status then 
        local userData = serverAPI.getUser()
        cb(userData) 
    end 
end) 

RegisterNUICallback("favoriteVehicle",function(data,cb)
    local bool,vehiclesData = serverAPI.favoriteVehicle(data.vehicle.spawn) 
    if bool then 
        serverVehicles = vehiclesData
        cb(serverVehicles)
    end 
end)

RegisterNUICallback("unfavoriteVehicle",function(data,cb)
    local bool,vehiclesData = serverAPI.unfavoriteVehicle(data.vehicle.spawn) 
    if bool then 
        serverVehicles = vehiclesData
        cb(serverVehicles)
    end 
end) 

RegisterNUICallback("hideFrame",function(data,cb)
    SetNuiFocus(false)
    LocalPlayer.state.openedAdminPanel =  false 
end)

RegisterNetEvent("black_admin:initUser")
AddEventHandler("black_admin:initUser",function(data)
    serverItems    = data.items 
    serverVehicles = data.vehicles 
end)

function src.openAdminPanel()
    SendNUIMessage({ action = "showFrame",payload = true })
    SetNuiFocus(true,true)
end

function src.requestData()
    local objects = {}
    local vehicles = {}
    for obj in enumerateObjects() do
        local model = GetEntityModel(obj)
        table.insert(objects, {obj = obj, model = model})
    end
    for vehicle in enumerateVehicles() do
        local model = GetEntityModel(vehicle)
        table.insert(vehicles, {vehicle = vehicle, model = model})
    end
    
    return objects,vehicles
end

function src.sendNuiMessage(data,bool,state)
    SendNUIMessage(data)
    SetNuiFocus(bool,bool)

    if state ~= nil then 
        LocalPlayer["state"]["openedAdminPanel"] = state
    end     
end

function src.setEntityHealth(value)
    SetEntityHealth(PlayerPedId(),value)
end

function src.setEntityArmour(value)
    SetPedArmour(PlayerPedId(),value)
end

function src.isPedInAnyVehicle()
    return IsPedInAnyVehicle(PlayerPedId(),true)
end

function src.initSpectate(src)
	if not NetworkIsInSpectatorMode() then
		local pid = GetPlayerFromServerId(src)
		local ped = GetPlayerPed(pid)

		NetworkSetInSpectatorMode(true,ped)
		LocalPlayer["state"]["Spectate"] = true
	end
end

function src.resetSpectate()
	if NetworkIsInSpectatorMode() then
		NetworkSetInSpectatorMode(false)
		LocalPlayer["state"]["Spectate"] = false
	end
end

function src.deleteAllVehicles()
    for vehicle in enumerateVehicles() do 
        DeleteVehicle(vehicle)
        if (DoesEntityExist(vehicle)) then 
            DeleteVehicle(vehicle) 
        end
    end 
end