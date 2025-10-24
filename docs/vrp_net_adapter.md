# Adaptador vRP Net

Este adaptador permite que sua base funcione com o framework vRP Net (Creative Network), fornecendo uma interface unificada para todas as funcionalidades do framework.

## Características

- **Compatibilidade Total**: Suporte completo ao vRP Net
- **Detecção Automática**: Detecta automaticamente quando o vRP Net está ativo
- **Interface Unificada**: Mesma interface para todos os frameworks
- **Funcionalidades Específicas**: Inclui funções específicas do vRP Net

## Funcionalidades Implementadas

### Gerenciamento de Usuários
- `GetUserId(source)` - Obter ID do usuário
- `GetUserSource(passport)` - Obter source do usuário
- `GetUserName(passport)` - Obter nome do usuário
- `GetUserIdentity(passport)` - Obter identidade completa
- `GetPlayers()` - Listar todos os jogadores
- `IsPlayerOnline(passport)` - Verificar se usuário está online

### Sistema de Permissões
- `HasPermission(passport, permission)` - Verificar permissão
- `GetUserGroups(passport)` - Obter grupos do usuário
- `GetUserGroup(passport)` - Obter grupo principal
- `AddUserGroup(passport, group)` - Adicionar grupo
- `RemoveUserGroup(passport, group)` - Remover grupo
- `GetUsersByPermission(permission)` - Listar usuários com permissão

### Sistema de Inventário
- `GetItems()` - Obter lista de itens
- `GetItemName(item)` - Obter nome do item
- `GiveItem(passport, item, amount)` - Dar item
- `RemoveItem(passport, item, amount)` - Remover item
- `GetUserInventory(passport)` - Obter inventário do usuário

### Sistema de Veículos
- `GetVehicles()` - Obter lista de veículos
- `GetVehicleName(vehicle)` - Obter nome do veículo
- `GetVehicleChest(vehicle)` - Obter capacidade do porta-malas
- `GetUserVehicles(passport)` - Obter veículos do usuário
- `AddVehicle(passport, vehicle, plate)` - Adicionar veículo
- `RemoveVehicle(passport, vehicle, plate)` - Remover veículo

### Sistema de Dinheiro
- `GetUserMoney(passport)` - Obter dinheiro em mãos
- `GetUserBank(passport)` - Obter dinheiro no banco
- `GiveMoney(passport, amount)` - Dar dinheiro no banco
- `GiveItemMoney(passport, amount)` - Dar dinheiro em mãos

### Banco de Dados
- `Prepare(query, sql)` - Preparar query
- `Query(query, params)` - Executar query SELECT
- `Execute(query, params)` - Executar query INSERT/UPDATE/DELETE

### Sistema de Moderação
- `KickPlayer(passport, reason)` - Expulsar jogador
- `BanPlayer(passport, reason)` - Banir jogador
- `UnbanPlayer(steam)` - Desbanir jogador

### Dados do Usuário
- `GetUserData(passport, key)` - Obter dados do usuário
- `SetUserData(passport, key, value)` - Definir dados do usuário

### Sistema de Propriedades
- `GetUserProperties(passport)` - Obter propriedades do usuário
- `GiveProperty(passport, name)` - Dar propriedade
- `RemoveProperty(passport, name)` - Remover propriedade

### Sistema de Notificações
- `Notify(source, type, title, message, duration)` - Enviar notificação
- `NotifyAll(type, title, message, duration)` - Enviar notificação para todos

### Eventos e Comandos
- `TriggerClientEvent(eventName, source, ...)` - Disparar evento cliente
- `TriggerServerEvent(eventName, ...)` - Disparar evento servidor
- `RegisterServerEvent(eventName, handler)` - Registrar evento servidor
- `RegisterClientEvent(eventName, handler)` - Registrar evento cliente
- `RegisterCommand(command, handler, restricted)` - Registrar comando

### Sistema NUI
- `SendNUIMessage(data)` - Enviar mensagem NUI
- `SetNuiFocus(hasFocus, hasCursor)` - Controlar foco NUI
- `RegisterNUICallback(callback, handler)` - Registrar callback NUI

### Funções de Veículos
- `CreateVehicle(model, x, y, z, heading)` - Criar veículo
- `SpawnVehicleForPlayer(source, model, x, y, z, heading)` - Spawnar veículo para jogador
- `RepairVehicle(source)` - Reparar veículo
- `TuneVehicle(source)` - Tunar veículo

### Funções Específicas do vRP Net
- `GetPhone(passport)` - Obter número de telefone
- `ClearInventory(passport, ignore)` - Limpar inventário
- `Request(source, title, message)` - Fazer request
- `Revive(source, health, arena)` - Reviver jogador
- `Task(source, amount, speed)` - Executar taskbar
- `Device(source, seconds)` - Executar device
- `LetterGame(source, duration, speed)` - Executar letter game

## Exemplo de Uso

```lua
-- Inicializar o framework
Framework.Initialize()

-- Aguardar o adaptador estar pronto
CreateThread(function()
    while not Framework.Adapter do
        Wait(100)
    end
    
    local adapter = Framework.GetAdapter()
    
    if adapter.isServer then
        -- No servidor
        local source = 1
        local passport = adapter.GetUserId(source)
        
        if passport then
            -- Obter dados do usuário
            local userName = adapter.GetUserName(passport)
            local money = adapter.GetUserMoney(passport)
            
            -- Enviar notificação
            adapter.Notify(source, "sucesso", "Bem-vindo", "Olá " .. userName .. "!", 5000)
            
            -- Dar dinheiro
            adapter.GiveMoney(passport, 1000)
        end
    else
        -- No cliente
        local passport = adapter.GetUserId()
        local userName = adapter.GetUserName(passport)
        
        print("Meu nome: " .. userName)
    end
end)
```

## Configuração

O adaptador é detectado automaticamente quando o recurso `vrp_net` está ativo. Não é necessária configuração adicional.

## Dependências

- vRP Net Framework
- MySQL/MariaDB
- FiveM/RedM

## Notas Importantes

1. O vRP Net usa `passport` como identificador único do usuário
2. As funções específicas do vRP Net estão disponíveis apenas quando o framework está ativo
3. O sistema de permissões usa o sistema de `Groups` do vRP Net
4. O inventário é gerenciado através do sistema de itens do vRP Net

## Suporte

Para suporte ou dúvidas sobre o adaptador vRP Net, consulte a documentação do framework ou entre em contato com a equipe de desenvolvimento.