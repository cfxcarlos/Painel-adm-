local Proxy = module("vrp","lib/Proxy")
local Tunnel = module("vrp","lib/Tunnel")
vRP = Proxy.getInterface("vRP")
vRPC = Tunnel.getInterface("vRP")
vKEYBOARD = Tunnel.getInterface("keyboard")

Utils = {}

Utils.functions = {
    prepare = function(...)
        vRP.prepare(...)
    end,
    query = function(...)
        return vRP.query(...)
    end,    
    execute = function(...)
        return vRP.execute(...)
    end,
    getUserId = function(source)
        return vRP.getUserId(source)
    end,    
    hasPermission = function(user_id,perm)
        return vRP.hasGroup(user_id,perm)
    end,
    getUserIdentity = function(user_id)
        return vRP.userIdentity(user_id)
    end,
    getUserName = function(user_id)
        local identity = Utils.functions.getUserIdentity(user_id)
        return identity["name"].." "..identity["name2"]
    end,
    getPlayers = function()
        return vRP.getPlayersOn()
    end,  
    getItems = function()
        return itemList()
    end,
    getItemName = function(item)
        return itemName(item)
    end,
    getVehicles = function()
        return vehicleGlobal()
    end,
    getVehicleName = function(vehSpawn)
        return vehicleName(vehSpawn)
    end,  
    getVehicleChest = function(vehSpawn)
        return vehicleChest(vehSpawn)
    end,
    giveItem = function(user_id,itemName,amount)
        return vRP.giveInventoryItem(user_id,itemName,amount,true)
    end,
    removeItem = function(user_id,item,amount)
        return vRP.tryGetInventoryItem(user_id, item, amount)
    end,
    getDatatable = function(user_id)
        return vRP.getDatatable(user_id)
    end,
    getUserBank = function(user_id)
        return vRP.getBank(user_id)
    end,
    getUserWallet = function(user_id)
        return vRP.itemAmount(user_id,"dollars")
    end,    
    getUserSource = function(user_id)
        return vRP.userSource(user_id)
    end,
    giveSalary = function(user_id,value,group)
        local userSource = Utils.functions.getUserSource(user_id)
        if user_id and userSource then 
            vRP.addBank(user_id,value)
            TriggerClientEvent("Notify",userSource,"verde",string.format(Config.notifys.salary,group,value),5000)
        end 
    end,
    giveMoney = function(user_id,value)
        return vRP.addBank(user_id,value)
    end,
    isPlayerOnline = function(user_id)
        return vRP.userSource(user_id) ~= nil 
    end,
    filterStaffGroup = function(user_id)
        local group  = ""
        local groups = vRP.Groups()
        for _, staffGroup in pairs(Config.staffGroups) do
            for permission, _ in pairs(groups) do
                local data = vRP.DataGroups(permission)
                if data[tostring(user_id)] and permission == staffGroup then
                    group = permission
                end
            end
        end
        return group 
    end,
    getUserStaffGroup = function(user_id)
        return Utils.functions.filterStaffGroup(user_id)
    end,
    getUserGroups = function(user_id)
        local arr = {}
        local groups = vRP.Groups()
        for permission, _ in pairs(groups) do
            local data = vRP.DataGroups(permission)
            if data[tostring(user_id)] then
                table.insert(arr,permission)
            end
        end
        return arr 
    end,
    getUserGroup = function(user_id)
        local group  = ""
        local groups = vRP.Groups()
        for permission, _ in pairs(groups) do
            local data = vRP.DataGroups(permission)
            if data[tostring(user_id)] then
                group = permission
            end
        end
        return group 
    end,    
    syncGarages = function(plate)
        TriggerEvent("engine:tryFuel",plate,100)
		TriggerEvent("plateEveryone",plate)
    end,
    addVehicle = function(vehicleName,user_id)
        Utils.functions.execute("black/addVehicles",{ 
            user_id = user_id,
            vehicle = vehicleName,
            plate = vRP.generatePlate(),
            work = "false"
        })
    end,
    addVehicleRental = function(vehicleName,user_id,duration)
        Utils.functions.execute("black/addVehicles",{ 
            user_id = user_id,
            vehicle = vehicleName,
            plate = vRP.generatePlate(),
            work = "false",
            rentalDays = duration 
        })
    end,
    removeVehicleFromUser = function(vehicleName,vehiclePlate,ownerId)
        Utils.functions.execute("black/remVehicles",{
            user_id = ownerId,
            vehicle = vehicleName,
            plate = vehiclePlate
        })
    end,
    createVehicle = function(user_id,source,model,x,y,z,heading)
        local mHash = GetHashKey(model)
        local myVeh = CreateVehicle(mHash,x,y,z,heading,true,true)
        local playerPed = GetPlayerPed(source)
        local vehPlate = "ADM"..math.random(10000,99999)
        while not DoesEntityExist(myVeh) do
            Wait(1000)
        end

        if DoesEntityExist(myVeh) then
            SetVehicleNumberPlateText(myVeh,vehPlate)
            SetPedIntoVehicle(playerPed,myVeh,-1)
            Utils.functions.syncGarages(vehPlate)
            clientAPI.sendNuiMessage(source,{ action = "showFrame",payload = false})
        end
    end,
    addUserGroup = function(user_id,group)
        return vRP.setPermission(user_id,group)
    end,    
    remUserGroup = function(user_id,group)
        return vRP.remPermission(user_id,group)
    end,
    getUserVehicles = function(user_id)
        local data = Utils.functions.query("black/getPlayerVehicles",{ user_id = user_id })
        local arr = {}
        if #data >= 1 then 
            for k,v in pairs(data) do 
                arr[#arr + 1] = {
                    spawn = v.vehicle,
                    plate = v.plate,
                    engine = v.engine,
                    body = v.body,
                    gas = v.gas,
                    trunk = v.trunk 
                }
            end  
        end 
        return arr 
    end,
    getUserPropertys = function(user_id)
        local data = Utils.functions.query("black/getPlayerPropertys",{ user_id = user_id })
        local arr = {}
        if next(data) then 
            for k,v in pairs(data) do 
                arr[#arr + 1] = {
                    name = v.name,
                    street = ""
                }
            end 
        end 
        return arr 
    end,
    getUsersByPermission = function(group)
        local users = vRP.getUsersByPermission(group)
        local arr = {}
        
        for k,v in pairs(users) do 
            arr[#arr + 1] = v
        end 
        return arr 
    end,    
    removeProperty = function(user_id,name)
        Utils.functions.execute("black/removeUserProperty",{ user_id = user_id,name = name })
    end,
    giveProperty = function(user_id,name)
        Utils.functions.execute("propertys/Buy",
        {
            name = name,
            interior = "Diamond",
            user_id = user_id, 
            price = 100000,
            vault = 100.00,
            fridge = 100.00,
            tax = os.time() + 2592000,
            owner = 1,
        })
    end,
    setArmour = function(source,value)
        return vRP.setArmour(source,value)
    end,
    kickPlayer = function(user_id)
        return vRP.kick(user_id,"Você foi kickado por um admin.")
    end,
    removeWhitelist = function(user_id)
        local steam = vRP.getIdentities(source)
        Utils.functions.execute("black/updateWhitelist",{ steam = steam,whitelist = 0 })
    end,
    repairVehicleMethod = function(source)
        local vehicle,vehNet,vehPlate = vRPC.vehList(source,4)
		if vehicle then
            local activePlayers = vRPC.activePlayers(source)
		    for _,v in ipairs(activePlayers) do
		    	async(function()
		    		TriggerClientEvent("inventory:repairAdmin",v,vehNet,vehPlate)
		    	end)
		    end
        end
    end,
    tuningVehicleMethod = function(nsource)
        TriggerClientEvent("admin:vehicleTuning", nsource)
    end,
    setBanned = function(user_id,reason)
        local identity = vRP.userIdentity(user_id)
		if identity then
			vRP.kick(user_id,reason)
			vRP.execute("banneds/insertBanned",{ steam = identity["steam"] })
        end
    end,
    getUserData = function(user_id,key)
        return vRP.userData(user_id,key)
    end,    
    setUserData = function(user_id,key,value)
        vRP.execute("playerdata/setUserdata",{ user_id = user_id, key = key, value = value })
    end
}

Utils.functions.prepare("black/getPlayerVehicles","SELECT * FROM vehicles WHERE user_id = @user_id")
Utils.functions.prepare("black/addVehicles","INSERT IGNORE INTO vehicles(user_id,vehicle,plate,work,rental,tax) VALUES(@user_id,@vehicle,@plate,@work,UNIX_TIMESTAMP() + @rentalDays,UNIX_TIMESTAMP() + 604800)")
Utils.functions.prepare("black/remVehicles","DELETE FROM vehicles WHERE user_id = @user_id AND vehicle = @vehicle AND plate = @plate")
Utils.functions.prepare("black/getPlayerPropertys", "SELECT * FROM propertys WHERE user_id = @user_id")
Utils.functions.prepare("black/removeUserProperty","DELETE FROM `propertys` WHERE user_id = @user_id AND name = @name")
Utils.functions.prepare("black/updateWhitelist","UPDATE accounts SET whitelist = @whitelist WHERE steam = @steam")

RegisterNetEvent("black_admin:god")
AddEventHandler("black_admin:god",function(args)
    args = parseInt(args)
    local source = source 
    local user_id = vRP.getUserId(source)
    local nsource = vRP.userSource(args)
    if vRP.hasPermission(user_id,"Admin") then 
        clientAPI.setEntityHealth(nsource,Config.maxHealth)
        exports["black_admin"]:sendLog("god",user_id,args,{})
    end
end)

RegisterNetEvent("black_admin:whitelist")
AddEventHandler("black_admin:whitelist",function(args)
    args = parseInt(args)
    local source = source 
    local user_id = vRP.getUserId(source)
    if vRP.hasPermission(user_id,"Admin") then 
        vRP.execute("accounts/setwl",{ whitelist = 1,id = tonumber(args) })
        TriggerClientEvent("Notify",source,"amarelo","Atenção","Passaporte <b>"..tonumber(args).."</b> liberado na whitelist.",5000)
        exports["black_admin"]:sendLog("wl",user_id,args,{})
    end
end)

RegisterNetEvent("black_admin:tuning")
AddEventHandler("black_admin:tuning",function()
    local source = source 
    local user_id = vRP.getUserId(source)
    if vRP.hasPermission(user_id,"Admin") then 
        TriggerClientEvent("admin:vehicleTuning", source)
        exports["black_admin"]:sendLog("god",user_id,nil,{})
    end
end)

RegisterNetEvent("black_admin:kickplayers")
AddEventHandler("black_admin:kickplayers",function()
    local source = source 
    local user_id = vRP.getUserId(source)
    if vRP.hasPermission(user_id,"Admin") then 
        local users = vRP.getPlayersOn() 
        for k,v in pairs(users) do 
            local nuser_id = vRP.getUserId(v)
            vRP.kick(nuser_id,"Um admin desconectou todos os jogadores.")
            exports["black_admin"]:sendLog("kickall",user_id,nil,{})
        end 
    end
end)

RegisterNetEvent("black_admin:fix")
AddEventHandler("black_admin:fix",function()
    local source = source 
    local user_id = vRP.getUserId(source)
    if vRP.hasPermission(user_id,"Admin") then 
        local vehicle,vehNet,vehPlate = vRPC.vehList(source,4)
		if vehicle then
            local activePlayers = vRPC.activePlayers(source)
		    for _,v in ipairs(activePlayers) do
		    	async(function()
		    		TriggerClientEvent("inventory:repairAdmin",v,vehNet,vehPlate)
		    	end)
                exports["black_admin"]:sendLog("fix",user_id,nil,{})
		    end
        end
    end
end)

RegisterNetEvent("black_admin:tpcds")
AddEventHandler("black_admin:tpcds",function(args)
    local source = source 
    local user_id = vRP.getUserId(source)
    local coords = {}
    for coord in string.gmatch(args or "0,0,0","[^,]+") do
      table.insert(coords,tonumber(coord))
    end
    if vRP.hasPermission(user_id,"Admin") then 
        local userPed = GetPlayerPed(source)
        SetEntityCoords(userPed,coords[1],coords[2],coords[3])
        exports["black_admin"]:sendLog("tpcds",user_id,nil,{
            ["1"] =  coords
        })
    end
end)

RegisterNetEvent("black_admin:tptome")
AddEventHandler("black_admin:tptome",function(args)
    args = parseInt(args)
    local source = source 
    local user_id = vRP.getUserId(source)
    local nsource = vRP.userSource(args)
    if vRP.hasPermission(user_id,"Admin") then 
        local userPed = GetPlayerPed(source)
        local userCoords = GetEntityCoords(userPed)
        local nPed = GetPlayerPed(nsource)
        SetEntityCoords(nPed,userCoords)
        exports["black_admin"]:sendLog("tptome",user_id,args,{})
    end
end)

RegisterNetEvent("black_admin:tpto")
AddEventHandler("black_admin:tpto",function(args)
    args = parseInt(args)
    local source = source 
    local user_id = vRP.getUserId(source)
    if vRP.hasPermission(user_id,"Admin") then 
        local nsource = vRP.userSource(args)
        local userPed = GetPlayerPed(source)
        local userCoords = GetEntityCoords(userPed)
        local nped = GetPlayerPed(nsource)
        local ncoords = GetEntityCoords(nped)
        SetEntityCoords(userPed,ncoords)
        exports["black_admin"]:sendLog("tpto",user_id,args,{})
    end
end)

RegisterNetEvent("black_admin:kick")
AddEventHandler("black_admin:kick",function(args)
    args = parseInt(args)
    local source = source 
    local user_id = vRP.getUserId(source)
    if vRP.hasPermission(user_id,"Admin") then 
        local nuser_id = parseInt(args)
        if nuser_id then
            vRP.kick(nuser_id,"Você foi kickado do servidor.")
            TriggerClientEvent("Notify",source,"amarelo","Atenção","Passaporte <b>"..nuser_id.."</b> kickado.",5000)
            exports["black_admin"]:sendLog("kick",user_id,args,{})
        end
    end
end)

RegisterNetEvent("black_admin:ban")
AddEventHandler("black_admin:ban",function(args)
    args = parseInt(args)
    local source = source 
    local user_id = vRP.getUserId(source)
    if vRP.hasPermission(user_id,"Admin") then 
        local nuser_id = parseInt(args)
        local identity = vRP.userIdentity(nuser_id)
        if identity then
            vRP.kick(nuser_id,"Banido.")
            vRP.execute("banneds/insertBanned",{ steam = identity["steam"] })
            TriggerClientEvent("Notify",source,"amarelo","Atenção","Passaporte <b>"..nuser_id.."</b> banido.",5000)
            exports["black_admin"]:sendLog("ban",user_id,args,{
                ["1"] = "permanente"
            })
        end
    end
end)

RegisterNetEvent("black_admin:unban")
AddEventHandler("black_admin:unban",function(args)
    args = parseInt(args)
    local source = source 
    local user_id = vRP.getUserId(source)
    if vRP.hasPermission(user_id,"Admin") then 
        local nuser_id = parseInt(args)
        local identity = vRP.userIdentity(nuser_id)
        if identity then
            vRP.execute("banneds/removeBanned",{ steam = identity["steam"] })
            TriggerClientEvent("Notify",source,"amarelo","Atenção","Passaporte <b>"..nuser_id.."</b> desbanido.",5000)
            exports["black_admin"]:sendLog("unban",user_id,nuser_id,{})
        end
    end
end)

RegisterNetEvent("black_admin:delvehs")
AddEventHandler("black_admin:delvehs",function(args)
    args = parseInt(args)
    local source = source 
    local user_id = vRP.getUserId(source)
    if vRP.hasPermission(user_id,"Admin") then 
        clientAPI.deleteAllVehicles(-1)
        exports["black_admin"]:sendLog("delvehs",user_id,nil,{})
    end
end)

RegisterNetEvent("black_admin:announce")
AddEventHandler("black_admin:announce",function(args)
    clientAPI.sendNuiMessage(source,{ action = "showFrame",payload = false})
    local source = source 
    local user_id = vRP.getUserId(source)
    if vRP.hasPermission(user_id,"Admin") then 
        local message = vKEYBOARD.keyArea(source, "Mensagem:", "")
        if not message or message == "" then
          return
        end

        TriggerClientEvent("Notify", -1, "vicecolor", "Mensagem enviada pela Prefeitura", message, 15000)
        TriggerClientEvent("sounds:source", -1, "notification", 0.5)
        exports["black_admin"]:sendLog("announce",user_id,nil,{
            ["1"] = message 
        })
    end
end)
