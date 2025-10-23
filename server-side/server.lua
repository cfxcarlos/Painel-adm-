spawnedVehicles = 0
spawnedObjects  = 0
emit            = TriggerEvent
emitNet         = TriggerClientEvent
rentalDuration  = {
    [5] = 432000,
    [10] = 864000,
    [15] = 1296000,
    [20] = 1728000,
    [30] = 2592000
}
spectate        = {}
chatMessages    = {
    ["user"] = {},
    ["nuser"] = {}
}
serverItems    = {}
serverVehicles = {}
cooldown       = {}

Utils.functions.prepare("black/getSalaries", "SELECT * FROM `black-admin-salaries`")
Utils.functions.prepare("black/addNewSalary",
    "INSERT IGNORE INTO `black-admin-salaries`(name,`group`,amount) VALUES(@name,@group,@amount)")
Utils.functions.prepare("black/remSalary",
    "DELETE FROM `black-admin-salaries` WHERE name = @name")
Utils.functions.prepare("black/updateSalary",
    "UPDATE `black-admin-salaries` SET amount = @amount WHERE `group` = @group")
Utils.functions.prepare("black/getTempBans", "SELECT * from `black-admin-tempban`")
Utils.functions.prepare("black/removeBanTable", "DELETE FROM `black-admin-tempban` WHERE user_id = @user_id")
Utils.functions.prepare("black/addTempBan",
    "INSERT INTO `black-admin-tempban` (user_id, time, timestamp) VALUES (@user_id, @time, @timestamp)")
Utils.functions.prepare("black/getNotifications", "SELECT * from `black-admin-notifications`")
Utils.functions.prepare("black/deleteNotification", "DELETE FROM `black-admin-notifications` WHERE id = @id")
Utils.functions.prepare("black/insertNotification",
    "INSERT INTO `black-admin-notifications` (id,message,date) VALUES (@id,@message,@date)")

CreateThread(function()
    for k, v in pairs(Utils.functions.getItems()) do
        serverItems[#serverItems + 1] = {
            name = v.name,
            spawn = k,
            image = Config.imagesProvider.items .. k .. ".png"
        }
    end

    for k, v in pairs(Utils.functions.getVehicles()) do
        serverVehicles[#serverVehicles + 1] = {
            name = v[1],
            spawn = k,
            image = Config.imagesProvider.vehicles .. k .. ".png",
            favorite = false, 
            attributes = {
                engine = 100,
                body = 100,
                gas = 100,
                trunk = v[2]
            }
        }
    end
end) 

local function getFavoriteServerVehicles(user_id)
    if not user_id then return serverVehicles end
    local arr   = serverVehicles
    local cache = Utils.functions.getUserData(user_id, "black_admin:favoriteVehicles") or {}

    for _, vehicle in ipairs(arr) do
        vehicle.favorite = cache[vehicle.spawn] and true or false
    end

    return arr
end

function src.getUser()
    local source = source
    local user_id = Utils.functions.getUserId(source)
    local userName = Utils.functions.getUserName(user_id)
    local group = Utils.functions.getUserStaffGroup(user_id)
    local userImage = Utils.functions.getUserData(user_id, "black_admin:userImage") or Config.serverImage
    local obj = {}
    if user_id then
        obj = {
            name = userName,
            Image = tostring(userImage),
            id = user_id,
            charge = group
        }
    end
    collectgarbage("collect")
    return obj
end

function src.setUserData(data)
    local source = source
    local user_id = Utils.functions.getUserId(source)
    if user_id and data.userImage ~= "" then
        Utils.functions.setUserData(user_id, "black_admin:userImage", tostring(data.userImage))
        collectgarbage("collect")
        return true
    end
end

function src.getNotifications()
    local query = Utils.functions.query("black/getNotifications")
    local arr = {}
    if #query > 0 then
        for _, v in pairs(query) do
            arr[#arr + 1] = {
                message = v.message,
                data = v.date,
                id = v.id
            }
        end
    end
    collectgarbage("collect")
    return arr
end

function getFormatDate()
    return os.date("%d/%m/%Y %H:%M", os.time())
end

function generateId()
    local letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789"
    local code = ""

    math.randomseed(os.time())

    for i = 1, 8 do
        local index = math.random(1, #letters)
        code = code .. letters:sub(index, index)
    end

    return code
end

function sendLog(nameLog, userPerformedId, userSufferedId, args)
    if Config.logs.webHookLinks[nameLog] then
        local userPerformed = Utils.functions.getUserIdentity(tonumber(userPerformedId))
        if userPerformed then
            userPerformed = {
                name = userPerformed.name or " ",
                surname = userPerformed.name2 or " ",
                id = userPerformedId
            }
        else
            userPerformed = {}
            userPerformed.id = userPerformedId
        end
        local userSuffered = Utils.functions.getUserIdentity(tonumber(userSufferedId))
        if userSuffered then
            userSuffered = {
                name = userSuffered.name or " ",
                surname = userSuffered.name2 or " ",
                id = userSufferedId
            }
        else
            userSuffered = {}
            userSuffered.id = userSufferedId
        end
        Wait(1000)
        PerformHttpRequest(Config.logs.webHookLinks[nameLog].link, function(err, data)
            if err >= 200 and err <= 299 then
                PerformHttpRequest(Config.logs.webHookLinks[nameLog].link, function(err, text, headers) return end, 'POST',
                    json.encode({ embeds = { Config.logs.webHookLinks[nameLog].embed(userPerformed, userSuffered, args) } }),
                    { ['Content-Type'] = 'application/json' })
            end
        end)
        return
    end
end

exports("sendLog", sendLog)

function src.saveNotification(message)
    local source = source
    local user_id = Utils.functions.getUserId(source)
    if user_id then
        Utils.functions.execute("black/insertNotification", {
            message = message,
            date = getFormatDate(),
            id = generateId(),
        })
        sendLog("addNotification", user_id, nil, {
            ["1"] = message
        })
        return true, src.getNotifications()
    end
end

function src.deleteNotification(notifyId)
    local source = source
    local user_id = vRP.getUserId(source)
    if user_id then
        local query = Utils.functions.query("black/getNotifications")
        if #query > 0 then
            if query[1].id == notifyId then
                Utils.functions.execute("black/deleteNotification", {
                    id = notifyId
                })
                sendLog("remNotification", user_id, nil, {
                    ["1"] = query[1].message
                })
                return true, src.getNotifications()
            end
        end
    end
end

function getConnectedPlayers()
    local users = Utils.functions.getPlayers()
    local connectedPlayers = 0
    for k, v in pairs(users) do
        connectedPlayers = connectedPlayers + 1
    end
    return connectedPlayers
end

function src.getUsers()
    local connectedPlayers = getConnectedPlayers()
    local slots = GetConvarInt("sv_maxclients")

    return {
        players = connectedPlayers,
        slots = slots
    }
end

function src.getServerData()
    local obj, veh = clientAPI.requestData(-1)
    return {
        props = #obj,
        vehicles = #veh
    }
end

function src.favoriteVehicle(vehicleName)
    local source = source 
    local user_id = Utils.functions.getUserId(source)
    if user_id and os.time() >= parseInt(cooldown[user_id]) then 
        cooldown[user_id] = os.time() + 3
        local cache = Utils.functions.getUserData(user_id, "black_admin:favoriteVehicles") or {}
        if not cache[vehicleName] then 
            cache[vehicleName] = true 
            Utils.functions.setUserData(user_id, "black_admin:favoriteVehicles", json.encode(cache)) 
            return true,getFavoriteServerVehicles(user_id)
        end 
    end 
    return false,{}
end 

function src.unfavoriteVehicle(vehicleName)
    local source = source 
    local user_id = Utils.functions.getUserId(source)
    if user_id and os.time() >= parseInt(cooldown[user_id]) then 
        cooldown[user_id] = os.time() + 3
        local cache = Utils.functions.getUserData(user_id, "black_admin:favoriteVehicles") or {}
        if cache[vehicleName] then 
            cache[vehicleName] = nil 
            Utils.functions.setUserData(user_id, "black_admin:favoriteVehicles", json.encode(cache)) 
            return true,getFavoriteServerVehicles(user_id)
        end 
    end 
    return false,{}
end 

function src.spawnVehicle(vehicleName)
    if not vehicleName then return end
    local source = source
    local user_id = Utils.functions.getUserId(source)
    local ped = GetPlayerPed(source)
    local pedCoords = GetEntityCoords(ped)
    local pedHeading = GetEntityHeading(ped)
    if user_id then
        Utils.functions.createVehicle(user_id, source, vehicleName, pedCoords.x, pedCoords.y, pedCoords.z, pedHeading)
        sendLog("spawnVehicle", user_id, nil, {
            ["1"] = vehicleName
        })
    end
end

function src.addVehicleToUser(vehicleName, user_id, duration)
    local permanent = duration == "permanente"
    if not permanent then
        Utils.functions.addVehicleRental(vehicleName, user_id, rentalDuration[duration])
        sendLog("addVehicle", user_id, nil, {
            ["1"] = vehicleName,
            ["2"] = tostring(duration) .. " dias"
        })
    else
        Utils.functions.addVehicle(vehicleName, user_id)
        sendLog("addVehicle", user_id, nil, {
            ["1"] = vehicleName,
            ["2"] = "permanente"
        })
    end
end

function src.removeVehicleFromUser(vehicleName, vehiclePlate, ownerId)
    local source = source
    local user_id = Utils.functions.getUserId(source)
    if user_id then
        Utils.functions.removeVehicleFromUser(vehicleName, vehiclePlate, ownerId)
        sendLog("remVehicle", user_id, ownerId, {
            ["1"] = vehicleName
        })
    end
end

function src.getItem(nuser_id, itemName, amount)
    local source = source
    local user_id = nuser_id or Utils.functions.getUserId(source)
    amount = amount or 1
    Utils.functions.giveItem(user_id, itemName, amount)
    sendLog("spawnItem", user_id, nil, {
        ["1"] = itemName,
        ["2"] = amount
    })
end

function playerGender(ped)
    if GetEntityModel(ped) == GetHashKey("mp_m_freemode_01") then
        return "male"
    elseif GetEntityModel(ped) == GetHashKey("mp_f_freemode_01") then
        return "female"
    end
end

function getUserVehicles(user_id)
    local data = Utils.functions.getUserVehicles(user_id)
    local arr = {}
    if next(data) then
        for k, v in pairs(data) do
            arr[#arr + 1] = {
                name = Utils.functions.getVehicleName(v.spawn),
                spawn = v.spawn,
                plate = v.plate,
                image = Config.imagesProvider.vehicles .. v.spawn .. ".png",
                attributes = {
                    engine = v.engine,
                    body = v.body,
                    gas = v.gas,
                    trunk = Utils.functions.getVehicleChest(v.trunk)
                }
            }
        end
    end
    collectgarbage("collect")
    return arr
end

function getUserItems(user_id)
    local dataTable = Utils.functions.getDatatable(user_id)
    local arr = {}
    if dataTable and dataTable["inventory"] then
        for k, v in pairs(dataTable["inventory"]) do
            arr[#arr + 1] = {
                name = Utils.functions.getItemName(v.item),
                quantity = v.amount,
                spawn = v.item,
                image = Config.imagesProvider.items .. v.item .. ".png"
            }
        end
    end
    collectgarbage("collect")
    return arr
end

function getUserProperties(user_id)
    local data = Utils.functions.getUserPropertys(user_id)
    if next(data) then
        collectgarbage("collect")
        return data
    else
        return {}
    end
end

function src.getOnlinePlayersData()
    local users = Utils.functions.getPlayers()
    local arr = {}
    for k, v in pairs(users) do
        local user_id = Utils.functions.getUserId(v)
        local dataTable = Utils.functions.getDatatable(user_id)
        local userIdentity = Utils.functions.getUserIdentity(user_id)
        local userSource = Utils.functions.getUserSource(user_id)
        local userName = Utils.functions.getUserName(user_id)
        local isPlayerOnline = Utils.functions.isPlayerOnline(user_id)
        local userGroups = Utils.functions.getUserGroups(user_id)
        local role = Utils.functions.getUserGroup(user_id)
        local userPed = GetPlayerPed(v)
        local userHealth = math.floor((GetEntityHealth(userPed) - 100) / (GetPedMaxHealth(userPed) - 100) * 100)
        local userArmour = GetPedArmour(userPed)
        local userThirst = dataTable["thirst"]
        local userHunger = dataTable["hunger"]
        local gender = playerGender(userPed)
        local userWallet = Utils.functions.getUserWallet(user_id)
        local userBank = Utils.functions.getUserBank(user_id)
        local userVehicles = getUserVehicles(user_id)
        local userItems = getUserItems(user_id)
        local userProperties = getUserProperties(user_id)
        local userImage = Utils.functions.getUserData(user_id, "black_admin:userImage") or Config.serverImage

        arr[#arr + 1] = {
            name = userName,
            id = user_id,
            image = tostring(userImage),
            online = isPlayerOnline,
            groups = userGroups,
            stats = {
                health = userHealth,
                armour = userArmour,
                thirst = userThirst,
                hunger = userHunger
            },
            gender = gender,
            phone = userIdentity["phone"],
            role = role,
            registry = userIdentity["serial"],
            money = {
                wallet = userWallet,
                bank = userBank
            },
            vehicles = userVehicles,
            items = userItems,
            properties = userProperties
        }
    end
    collectgarbage("collect")
    return arr
end

function src.groupPlayersList()
    local users = Utils.functions.getPlayers()
    local arr = {}
    for k, v in pairs(users) do
        local user_id = Utils.functions.getUserId(v)
        local userIdentity = Utils.functions.getUserIdentity(user_id)
        local userSource = Utils.functions.getUserSource(user_id)
        local userName = Utils.functions.getUserName(user_id)
        local isPlayerOnline = Utils.functions.isPlayerOnline(user_id)
        local userGroups = Utils.functions.getUserGroups(user_id)
        local role = Utils.functions.getUserGroup(user_id)

        arr[#arr + 1] = {
            name = userName,
            id = user_id,
            image = Config.serverImage,
            online = isPlayerOnline,
            groups = userGroups,
            role = role
        }
    end
    collectgarbage("collect")
    return arr
end

function src.addUserGroup(id, role)
    local source = source
    local user_id = Utils.functions.getUserId(source)
    local nuser_id = id or Utils.functions.getUserId(source)
    if nuser_id and role and type(role) == "string" then
        Utils.functions.addUserGroup(nuser_id, role)
        sendLog("addGroup", user_id, id, {
            ["1"] = role
        })
    end
end

function src.remUserGroup(id, role)
    local source = source
    local user_id = Utils.functions.getUserId(source)
    local nuser_id = id or Utils.functions.getUserId(source)
    if nuser_id and role and type(role) == "string" then
        Utils.functions.remUserGroup(nuser_id, role)
        sendLog("remGroup", user_id, id, {
            ["1"] = role
        })
    end
end

function src.getSalaries()
    local data = Utils.functions.query("black/getSalaries")
    local arr = {}
    if #data > 0 then
        for k, v in pairs(data) do
            arr[#arr + 1] = {
                name = v.name,
                group = v.group,
                members = Utils.functions.getUsersByPermission(v.group),
                salary = v.amount
            }
        end
    end
    collectgarbage("collect")
    return arr
end

function src.setNewSalary(data, amount)
    if data.group ~= "" and amount > 0 then
        Utils.functions.execute("black/updateSalary", { group = data.group, amount = amount })
        collectgarbage("collect")
    end
end

function src.addNewSalary(name, group, amount)
    local source = source
    local user_id = Utils.functions.getUserId(source)
    if group ~= "" and amount > 0 then
        Utils.functions.execute("black/addNewSalary", { name = name, group = group, amount = amount })
        clientAPI.sendNuiMessage(source, { action = "setSalaries", payload = src.getSalaries() }, true)
        sendLog("addSalary", user_id, nil, {
            ["1"] = group,
            ["2"] = amount
        })
        collectgarbage("collect")
    end
end

function src.removeSalary(name)
    local source = source 
    local user_id = vRP.getUserId(source) 
    if user_id then 
        Utils.functions.execute("black/remSalary",{ name = name })
        clientAPI.sendNuiMessage(source, { action = "setSalaries", payload = src.getSalaries() }, true)
        collectgarbage("collect")
    end 
end 

function src.removeItemFromUser(spawn, nuser_id)
    local source = source
    local user_id = Utils.functions.getUserId(source)
    if spawn ~= '' and spawn ~= nil and nuser_id ~= nil and nuser_id > 0 then
        Utils.functions.removeItem(nuser_id, spawn, 1)
        clientAPI.sendNuiMessage(source, { action = "showFrame", payload = false })
        sendLog("remItem", user_id, nuser_id, {
            ["1"] = spawn
        })
        collectgarbage("collect")
    end
end

function src.removeProperty(nuser_id, name)
    local source = source
    local user_id = Utils.functions.getUserId(source)
    if name ~= '' and name ~= nil and nuser_id ~= nil and nuser_id > 0 then
        Utils.functions.removeProperty(nuser_id, name)
        clientAPI.sendNuiMessage(source, { action = "showFrame", payload = false })
        sendLog("remProperty", user_id, nuser_id, {
            ["1"] = name
        })
        collectgarbage("collect")
    end
end

function src.giveProperty(nuser_id, name)
    local source = source
    local user_id = Utils.functions.getUserId(source)
    if name ~= '' and name ~= nil and nuser_id ~= nil and nuser_id > 0 then
        Utils.functions.giveProperty(nuser_id, name)
        clientAPI.sendNuiMessage(source, { action = "showFrame", payload = false })
        sendLog("addProperty", user_id, nuser_id, {
            ["1"] = name
        })
        collectgarbage("collect")
    end
end

function src.giveMoneyToUser(nuser_id, amount)
    local source = source
    local user_id = Utils.functions.getUserId(source)
    if amount ~= nil and amount > 0 and nuser_id ~= nil and nuser_id > 0 then
        Utils.functions.giveMoney(nuser_id, amount)
        clientAPI.sendNuiMessage(source, { action = "showFrame", payload = false })
        sendLog("giveMoney", user_id, nuser_id, {
            ["1"] = amount
        })
        collectgarbage("collect")
    end
end

function src.playerActions(nuser_id, action)
    local source = source
    local user_id = Utils.functions.getUserId(source)
    local nsource = Utils.functions.getUserSource(nuser_id)
    local userPed = GetPlayerPed(source)
    local userCoords = GetEntityCoords(userPed)
    local nped = GetPlayerPed(nsource)
    local ncoords = GetEntityCoords(nped)
    if action ~= "" and action ~= nil and user_id > 0 then
        if action == "fix" then
            if clientAPI.isPedInAnyVehicle(nsource) then
                Utils.functions.repairVehicleMethod(nsource)
                sendLog("fix", user_id, nil, {})
            end
        elseif action == "kill" then
            clientAPI.setEntityHealth(nsource, Config.deadHealth)
            sendLog("kill", user_id, nuser_id, {})
        elseif action == "tpto" then
            if nuser_id ~= user_id then
                SetEntityCoords(userPed, ncoords)
                sendLog("tpto", user_id, nuser_id, {})
            end
        elseif action == "tptome" then
            if nuser_id ~= user_id then
                SetEntityCoords(nped, userCoords)
                sendLog("tptome", user_id, nuser_id, {})
            end
        elseif action == "god" then
            clientAPI.setEntityHealth(nsource, Config.maxHealth)
            sendLog("god", user_id, nuser_id, {})
        elseif action == "armour" then
            Utils.functions.setArmour(nsource, 100)
            sendLog("armour", user_id, nuser_id, {})
        elseif action == "tuning" then
            if clientAPI.isPedInAnyVehicle(nsource) then
                Utils.functions.tuningVehicleMethod(nsource)
                clientAPI.sendNuiMessage(nsource, { action = "showFrame", payload = false })
                sendLog("tuning", user_id, nil, {})
            end
        elseif action == "unwl" then
            Utils.functions.removeWhitelist(nuser_id)
            sendLog("unwl", user_id, nuser_id, {})
        elseif action == "kick" then
            if nuser_id ~= user_id then
                Utils.functions.kickPlayer(nuser_id)
                sendLog("kick", user_id, nuser_id, {})
            end
        elseif action == "spectate" then
            if nuser_id ~= user_id then
                if spectate[user_id] then
                    clientAPI.resetSpectate(source)
                    local ped = GetPlayerPed(spectate[user_id])
                    if DoesEntityExist(ped) then
                        SetEntityDistanceCullingRadius(ped, 0.0)
                    end
                    sendLog("unspectate", user_id, nuser_id, {})
                    spectate[user_id] = false
                else
                    spectate[user_id] = nsource
                    local ped = GetPlayerPed(nsource)
                    if DoesEntityExist(ped) then
                        SetEntityDistanceCullingRadius(ped, 999999999.0)
                        Wait(1000)
                        clientAPI.initSpectate(source, nsource)
                        sendLog("spectate", user_id, nuser_id, {})
                    end
                end
            end
        end
        collectgarbage("collect")
    end
end

function formatBanTime(seconds)
    local days = math.floor(seconds / 86400)
    seconds = seconds - days * 86400
    local hours = math.floor(seconds / 3600)
    seconds = seconds - hours * 3600
    local minutes = math.floor(seconds / 60)
    seconds = seconds - minutes * 60

    if days > 0 then
        return string.format("%d Dias e %d Horas", days, hours)
    elseif hours > 0 then
        return string.format("%d Horas", hours)
    elseif minutes > 0 then
        return string.format("%d Minutos e %d Segundos", minutes, seconds)
    else
        return string.format("%d Segundos", seconds)
    end
end

function src.banUser(nuser_id, time)
    time = parseInt(time)
    local source = source
    local user_id = Utils.functions.getUserId(source)
    local timeBan = parseInt(86400 * time - (os.time() - os.time()))
    local formatedTimer = formatBanTime(timeBan)
    local nsource = Utils.functions.getUserSource(nuser_id)
    Utils.functions.execute("black/addTempBan", { user_id = nuser_id, time = os.time(), timestamp = timeBan })
    Utils.functions.setBanned(nuser_id, string.format(Config.banMessage, formatedTimer))
    sendLog("ban", user_id, nuser_id, {
        ["1"] = formatedTimer
    })
    collectgarbage("collect")
end

function src.sendChatMessage(content)
    if content ~= '' then
        local source = source
        local user_id = Utils.functions.getUserId(source)
        local user_name = Utils.functions.getUserName(user_id)
        local users = Utils.functions.getPlayers()
        local userImage = Utils.functions.getUserData(user_id, "black_admin:userImage") or Config.serverImage
        local date = os.date("%H:%M", os.time())
        local formateDate = "Hoje ás " .. date
        if user_id then
            chatMessages["user"][#chatMessages["user"] + 1] = {
                type = "user",
                author = user_name,
                date = formateDate,
                image = userImage,
                message = content
            }

            chatMessages["nuser"][#chatMessages["user"] + 1] = {
                type = "nuser",
                author = user_name,
                date = tostring(formateDate),
                image = userImage,
                message = content
            }

            clientAPI.sendNuiMessage(source, { action = "setChatMessages", payload = chatMessages["user"] }, true)
            for _, v in pairs(users) do
                if v ~= source then
                    if Player(v).state.openedAdminPanel then
                        clientAPI.sendNuiMessage(v, { action = "setChatMessages", payload = chatMessages["nuser"] },
                            true)
                    end
                end
            end
            sendLog("chat", user_id, nil, {
                ["1"] = content
            })
            collectgarbage("collect")
        end
    end
end

CreateThread(function()
    while true do
        local data = Utils.functions.query("black/getSalaries")
        if #data > 0 then
            local salarySucces = false
            local noMembers = false

            for k, v in pairs(data) do
                local groupMembers = Utils.functions.getUsersByPermission(v.group)

                if #groupMembers > 0 then
                    salarySucces = true
                    for c, d in pairs(groupMembers) do
                        Utils.functions.giveSalary(d, v.amount, v.group)
                    end
                else
                    noMembers = true
                end
            end

            if salarySucces then
                print("^2[BLACK-ADMIN] ENTREGANDO SALÁRIO AOS GRUPOS CONFIGURADOS NA DB")
            end
            if noMembers then
                print(
                    "^1[BLACK-ADMIN] ALGUNS GRUPOS NÃO POSSUEM MEMBROS, SALÁRIOS NÃO FORAM ENTREGUES NESSES GRUPOS")
            end
        else
            print(
                "^1[BLACK-ADMIN] NENHUM GRUPO FOI ADICIONADO NA DB DE SALÁRIOS, PORTANTO OS SALÁRIOS NÃO FORAM ENTREGUES")
        end
        collectgarbage("collect")
        Wait(1000 * 60 * 60 * parseInt(Config.salaryTimer))
    end
end)

CreateThread(function()
    while true do
        local query = Utils.functions.query('black/getTempBans')
        for k, v in pairs(query) do
            local time = v.timestamp + v.time
            if os.time() >= time then
                Utils.functions.execute('black/removeBanTable', { user_id = v.user_id })
                Utils.functions.execute('black/setUnbanned', { user_id = v.user_id })
            end
        end
        collectgarbage("collect")
        Wait(5000)
    end
end)

AddEventHandler("playerConnect",function(user_id,source)
    TriggerClientEvent("black_admin:initUser",source,{
        vehicles = getFavoriteServerVehicles(user_id),
        items    = serverItems 
    })
end)

RegisterCommand(Config.command, function(source, args)
    local user_id = Utils.functions.getUserId(source)
    for _, staffGroup in pairs(Config.staffGroups) do
        if Utils.functions.hasPermission(user_id, staffGroup) then
            clientAPI.openAdminPanel(source)
            if #chatMessages["user"] > 0 then
                clientAPI.sendNuiMessage(source, { action = "setChatMessages", payload = chatMessages["user"] }, true)
            end
            if #chatMessages["nuser"] > 0 then
                clientAPI.sendNuiMessage(source, { action = "setChatMessages", payload = chatMessages["nuser"] },
                    true)
            end
            Player(source).state.openedAdminPanel = true
        end
    end
end)
