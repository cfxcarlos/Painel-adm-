-- Exemplo de uso do Adaptador vRP Net
-- Demonstra como usar as funções do adaptador

-- Inicializar o framework
Framework.Initialize()

-- Aguardar o adaptador estar pronto
CreateThread(function()
    while not Framework.Adapter do
        Wait(100)
    end
    
    print("^2[EXEMPLO] Adaptador vRP Net carregado com sucesso^0")
    
    -- Exemplo de uso das funções principais
    ExampleUsage()
end)

function ExampleUsage()
    local adapter = Framework.GetAdapter()
    
    if not adapter then
        print("^1[EXEMPLO] Adaptador não encontrado^0")
        return
    end
    
    -- Exemplo de obtenção de dados do usuário
    if adapter.isServer then
        -- No servidor
        local source = 1 -- ID do jogador
        local passport = adapter.GetUserId(source)
        
        if passport then
            print("^3[EXEMPLO] Passport do jogador: " .. passport .. "^0")
            
            -- Obter nome do usuário
            local userName = adapter.GetUserName(passport)
            print("^3[EXEMPLO] Nome do usuário: " .. userName .. "^0")
            
            -- Verificar permissões
            local hasPermission = adapter.HasPermission(passport, "Admin")
            print("^3[EXEMPLO] Tem permissão de Admin: " .. tostring(hasPermission) .. "^0")
            
            -- Obter grupos do usuário
            local groups = adapter.GetUserGroups(passport)
            print("^3[EXEMPLO] Grupos do usuário: " .. table.concat(groups, ", ") .. "^0")
            
            -- Obter inventário
            local inventory = adapter.GetUserInventory(passport)
            print("^3[EXEMPLO] Itens no inventário: " .. #inventory .. "^0")
            
            -- Obter dinheiro
            local money = adapter.GetUserMoney(passport)
            local bank = adapter.GetUserBank(passport)
            print("^3[EXEMPLO] Dinheiro: $" .. money .. " | Banco: $" .. bank .. "^0")
            
            -- Dar item
            local success = adapter.GiveItem(passport, "dollar", 1000)
            if success then
                print("^2[EXEMPLO] Item dado com sucesso^0")
            end
            
            -- Dar dinheiro
            local success = adapter.GiveMoney(passport, 5000)
            if success then
                print("^2[EXEMPLO] Dinheiro dado com sucesso^0")
            end
            
            -- Enviar notificação
            adapter.Notify(source, "sucesso", "Exemplo", "Esta é uma notificação de exemplo!", 5000)
            
            -- Exemplo de uso de funções específicas do vRP Net
            local phone = adapter.GetPhone(passport)
            print("^3[EXEMPLO] Telefone: " .. phone .. "^0")
            
            -- Exemplo de request
            local response = adapter.Request(source, "Confirmação", "Deseja continuar?")
            print("^3[EXEMPLO] Resposta do request: " .. tostring(response) .. "^0")
            
        end
    else
        -- No cliente
        local passport = adapter.GetUserId()
        
        if passport then
            print("^3[EXEMPLO] Meu passport: " .. passport .. "^0")
            
            -- Obter meu nome
            local userName = adapter.GetUserName(passport)
            print("^3[EXEMPLO] Meu nome: " .. userName .. "^0")
            
            -- Verificar minhas permissões
            local hasPermission = adapter.HasPermission(passport, "Admin")
            print("^3[EXEMPLO] Tenho permissão de Admin: " .. tostring(hasPermission) .. "^0")
            
            -- Obter meus grupos
            local groups = adapter.GetUserGroups(passport)
            print("^3[EXEMPLO] Meus grupos: " .. table.concat(groups, ", ") .. "^0")
            
            -- Obter meu inventário
            local inventory = adapter.GetUserInventory(passport)
            print("^3[EXEMPLO] Meus itens: " .. #inventory .. "^0")
            
            -- Obter meu dinheiro
            local money = adapter.GetUserMoney(passport)
            local bank = adapter.GetUserBank(passport)
            print("^3[EXEMPLO] Meu dinheiro: $" .. money .. " | Meu banco: $" .. bank .. "^0")
        end
    end
end

-- Exemplo de comando
RegisterCommand("exemplo", function(source, args)
    local adapter = Framework.GetAdapter()
    
    if not adapter then
        print("^1[EXEMPLO] Adaptador não encontrado^0")
        return
    end
    
    if adapter.isServer then
        local passport = adapter.GetUserId(source)
        if passport then
            adapter.Notify(source, "info", "Comando", "Comando de exemplo executado!", 3000)
        end
    else
        adapter.Notify(source, "info", "Comando", "Comando de exemplo executado!", 3000)
    end
end, false)

-- Exemplo de evento
RegisterNetEvent("exemplo:evento")
AddEventHandler("exemplo:evento", function(data)
    local adapter = Framework.GetAdapter()
    
    if adapter then
        adapter.Notify(source, "info", "Evento", "Evento de exemplo recebido!", 3000)
        print("^3[EXEMPLO] Dados recebidos: " .. json.encode(data) .. "^0")
    end
end)

-- Exemplo de callback NUI
RegisterNUICallback("exemplo", function(data, cb)
    local adapter = Framework.GetAdapter()
    
    if adapter then
        print("^3[EXEMPLO] Callback NUI recebido: " .. json.encode(data) .. "^0")
        cb({status = "success", message = "Callback processado com sucesso!"})
    end
end)

print("^2[EXEMPLO] Exemplo de uso do vRP Net carregado^0")