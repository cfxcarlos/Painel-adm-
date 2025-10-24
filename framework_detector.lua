-- Sistema de Detecção Automática de Framework
-- Compatível com vRP, ESX, QBCore, vRP Net e Standalone

Framework = {}
Framework.Detected = nil
Framework.Adapter = nil

-- Função para detectar o framework em uso
function Framework.Detect()
    -- Verificar vRP Net (Creative Network)
if GetResourceState('vrp_net') == 'started' or GetResourceState('vrp') == 'started' then
    Framework.Detected = 'vrp_net'
    print("^2[FRAMEWORK] vRP Net (Creative) detectado^0")
    return 'vrp_net'
end
    -- Verificar vRP
    if GetResourceState('vrp') == 'started' then
        Framework.Detected = 'vrp'
        print("^2[FRAMEWORK] vRP detectado^0")
        return 'vrp'
    end
    
    -- Verificar ESX
    if GetResourceState('es_extended') == 'started' then
        Framework.Detected = 'esx'
        print("^2[FRAMEWORK] ESX detectado^0")
        return 'esx'
    end
    
    -- Verificar QBCore
    if GetResourceState('qb-core') == 'started' then
        Framework.Detected = 'qb'
        print("^2[FRAMEWORK] QBCore detectado^0")
        return 'qb'
    end
    
    -- Verificar vRP2 (vRP Legacy)
    if GetResourceState('vrp') == 'started' and GetResourceMetadata('vrp', 'version', 0) and 
       string.find(GetResourceMetadata('vrp', 'version', 0), '2') then
        Framework.Detected = 'vrp2'
        print("^2[FRAMEWORK] vRP2 detectado^0")
        return 'vrp2'
    end
    
    -- Standalone (sem framework)
    Framework.Detected = 'standalone'
    print("^3[FRAMEWORK] Modo Standalone ativado^0")
    return 'standalone'
end

-- Função para inicializar o adaptador correto
function Framework.Initialize()
    local framework = Framework.Detect()
    
    if framework == 'vrp_net' then
        Framework.Adapter = require('adapters.vrp_net_adapter')
    elseif framework == 'vrp' then
        Framework.Adapter = require('adapters.vrp_adapter')
    elseif framework == 'esx' then
        Framework.Adapter = require('adapters.esx_adapter')
    elseif framework == 'qb' then
        Framework.Adapter = require('adapters.qb_adapter')
    elseif framework == 'vrp2' then
        Framework.Adapter = require('adapters.vrp2_adapter')
    else
        Framework.Adapter = require('adapters.standalone_adapter')
    end
    
    if Framework.Adapter then
        Framework.Adapter.Initialize()
        print("^2[FRAMEWORK] Adaptador " .. framework .. " inicializado com sucesso^0")
    else
        print("^1[FRAMEWORK] Erro ao inicializar adaptador^0")
    end
end

-- Função para obter o adaptador atual
function Framework.GetAdapter()
    return Framework.Adapter
end

-- Função para verificar se um framework específico está ativo
function Framework.IsFramework(framework)
    return Framework.Detected == framework
end

-- Inicializar automaticamente
CreateThread(function()
    Wait(1000) -- Aguardar outros recursos carregarem
    Framework.Initialize()
end)
