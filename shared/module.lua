Config = {}

Config.imagesProvider = {
  items = "https://cdn.blacknetwork.com.br/black_inventory/",
  vehicles = "https://cdn.blacknetwork.com.br/conce/"
}

Config.serverImage = "http://104.234.65.89/inventory/logo.png"

Config.commands = {
    {
      type = "input",
      title = "Teleport To",
      placeholder = "Digite aqui...",
      event = "tpto",
      tunnel = "server"
    },
    {
      type = "input",
      title = "Teleport CDS",
      placeholder = "Digite aqui...",
      event = "tpcds",
      tunnel = "server"
    },
    {
      type = "button",
      title = "Limpar Veículos",
      components = {
        { name = "Deletar Veículos", event = "delvehs" }
      },
      tunnel = "server"
    },
    {
      type = "input",
      title = "Teleport To Me",
      placeholder = "Digite aqui...",
      event = "tptome",
      tunnel = "server"
    },
    {
      type = "input",
      title = "Banir Jogador",
      placeholder = "Digite aqui...",
      event = "ban",
      tunnel = "server"
    },
    {
      type = "input",
      title = "Desbanir Jogador",
      placeholder = "Digite aqui...",
      event = "unban",
      tunnel = "server"
    },
    {
      type = "input",
      title = "Expulsar Jogador",
      placeholder = "Digite aqui...",
      event = "kick",
      tunnel = "server"
    },
    {
      type = "input",
      title = "Reviver Jogador",
      placeholder = "Digite aqui...",
      event = "god",
      tunnel = "server"
    },
    {
      type = "input",
      title = "Liberar Whitelist",
      placeholder = "Digite aqui...",
      event = "whitelist",
      tunnel = "server"
    },
    {
      type = "button",
      title = "Criar anúncio",
      components = {
        { name = "Anunciar", event = "announce" }
      },
      tunnel = "server"
    },
    {
      type = "button",
      title = "Desconectar Jogadores",
      components = {
        { name = "Desconectar jogadores", event = "kickplayers" }
      },
      tunnel = "server"
    },
    {
      type = "button",
      title = "Arrumar veículo & Tunar",
      components = {
        { name = "Arrumar", event = "fix" },
        { name = "Tunar", event = "tuning" },
      },
      tunnel = "server"
    },
}

Config.logs = {
  webHookLinks = {
    ["addNotification"] = {
      link = "https://discord.com/api/webhooks/1225191463181222003/rLRP2UymyYo_NficDXgtSaAdrGhtMgVEPZuqRrwPeBzETB_tmdv5UaEswF22ngncp3XF",
      embed = function(userPerformed,userSuffered,args)
        return {
          title = "Adicionou uma notificação",
          description = "Esse administrador adicionou uma notificação no painel.",
          color = 2,
          fields = {
            {
              name = "Administrador",
              value = "```" .. userPerformed.id .. " - " .. userPerformed.name .. " " .. userPerformed.surname .. "```",
              inline = true
            },
            {
              name = "Mensagem",
              value = "```" .. args["1"] .. "```",
              inline = true
            },
            {
              name = "",
              value = os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S"),
              inline = false
            }
          }
        }
      end
    },
    ["remNotification"] = {
      link = "https://discord.com/api/webhooks/1225191463181222003/rLRP2UymyYo_NficDXgtSaAdrGhtMgVEPZuqRrwPeBzETB_tmdv5UaEswF22ngncp3XF",
      embed = function(userPerformed,userSuffered,args)
        return {
          title = "Removeu uma notificação",
          description = "Esse administrador removeu uma notificação do painel.",
          color = 2,
          fields = {
            {
              name = "Administrador",
              value = "```" .. userPerformed.id .. " - " .. userPerformed.name .. " " .. userPerformed.surname .. "```",
              inline = true
            },
            {
              name = "Mensagem",
              value = "```" .. args["1"] .. "```",
              inline = true
            },
            {
              name = "",
              value = os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S"),
              inline = false
            }
          }
        }
      end
    },
    ["spawnVehicle"] = {
      link = "https://discord.com/api/webhooks/1225191463181222003/rLRP2UymyYo_NficDXgtSaAdrGhtMgVEPZuqRrwPeBzETB_tmdv5UaEswF22ngncp3XF",
      embed = function(userPerformed,userSuffered,args)
        return {
          title = "Spawnou um veículo",
          description = "Esse administrador spawnou um veículo pelo painel.",
          color = 2,
          fields = {
            {
              name = "Administrador",
              value = "```" .. userPerformed.id .. " - " .. userPerformed.name .. " " .. userPerformed.surname .. "```",
              inline = true
            },
            {
              name = "Jogador",
              value = "```" .. userSuffered.id .. " - " .. userSuffered.name .. " " .. userSuffered.surname .. "```",
              inline = true
            },
            {
              name = "Veículo",
              value = "```" .. args["1"] .. "```",
              inline = true
            },
            {
              name = "",
              value = os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S"),
              inline = false
            }
          }
        }
      end
    },
    ["addVehicle"] = {
      link = "https://discord.com/api/webhooks/1225191463181222003/rLRP2UymyYo_NficDXgtSaAdrGhtMgVEPZuqRrwPeBzETB_tmdv5UaEswF22ngncp3XF",
      embed = function(userPerformed,userSuffered,args)
        return {
          title = "Adicionou um veículo",
          description = "Esse administrador adicionou um veículo para alguém ou ele mesmo.)",
          color = 2,
          fields = {
            {
              name = "Administrador",
              value = "```" .. userPerformed.id .. " - " .. userPerformed.name .. " " .. userPerformed.surname .. "```",
              inline = true
            },
            {
              name = "Jogador",
              value = "```" .. userSuffered.id .. " - " .. userSuffered.name .. " " .. userSuffered.surname .. "```",
              inline = true
            },
            {
              name = "Veículo",
              value = "```" .. args["1"] .. "```",
              inline = true
            },
            {
              name = "Duração",
              value = "```" .. args["2"] .. "```",
              inline = true
            },
            {
              name = "",
              value = os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S"),
              inline = false
            }
          }
        }
      end
    },
    ["remVehicle"] = {
      link = "https://discord.com/api/webhooks/1225191463181222003/rLRP2UymyYo_NficDXgtSaAdrGhtMgVEPZuqRrwPeBzETB_tmdv5UaEswF22ngncp3XF",
      embed = function(userPerformed,userSuffered,args)
        return {
          title = "Removeu um veículo",
          description = "Esse administrador removeu um veículo de alguém ou dele mesmo.",
          color = 2,
          fields = {
            {
              name = "Administrador",
              value = "```" .. userPerformed.id .. " - " .. userPerformed.name .. " " .. userPerformed.surname .. "```",
              inline = true
            },
            {
              name = "Jogador",
              value = "```" .. userSuffered.id .. " - " .. userSuffered.name .. " " .. userSuffered.surname .. "```",
              inline = true
            },
            {
              name = "Veículo",
              value = "```" .. args["1"] .. "```",
              inline = true
            },
            {
              name = "",
              value = os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S"),
              inline = false
            }
          }
        }
      end
    },
    ["spawnItem"] = {
      link = "https://discord.com/api/webhooks/1225191463181222003/rLRP2UymyYo_NficDXgtSaAdrGhtMgVEPZuqRrwPeBzETB_tmdv5UaEswF22ngncp3XF",
      embed = function(userPerformed,userSuffered,args)
        return {
          title = "Spawnou um item",
          description = "Esse administrador spawnou um item.",
          color = 2,
          fields = {
            {
              name = "Administrador",
              value = "```" .. userPerformed.id .. " - " .. userPerformed.name .. " " .. userPerformed.surname .. "```",
              inline = true
            },
            {
              name = "Item",
              value = "```" .. args["1"] .. "```",
              inline = true
            },
            {
              name = "Quantidade",
              value = "```" .. args["2"].. "```",
              inline = true
            },
            {
              name = "",
              value = os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S"),
              inline = false
            }
          }
        }
      end
    },
    ["addGroup"] = {
      link = "https://discord.com/api/webhooks/1225191463181222003/rLRP2UymyYo_NficDXgtSaAdrGhtMgVEPZuqRrwPeBzETB_tmdv5UaEswF22ngncp3XF",
      embed = function(userPerformed,userSuffered,args)
        return {
          title = "Adicionou um grupo",
          description = "Esse administrador adicionou um grupo em alguém ou nele mesmo.",
          color = 2,
          fields = {
            {
              name = "Administrador",
              value = "```" .. userPerformed.id .. " - " .. userPerformed.name .. " " .. userPerformed.surname .. "```",
              inline = true
            },
            {
              name = "Jogador",
              value = "```" .. userSuffered.id .. " - " .. userSuffered.name .. " " .. userSuffered.surname .. "```",
              inline = true
            },
            {
              name = "Grupo",
              value = "```" .. args["1"] .. "```",
              inline = true
            },
            {
              name = "",
              value = os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S"),
              inline = false
            }
          }
        }
      end
    },
    ["remGroup"] = {
      link = "https://discord.com/api/webhooks/1225191463181222003/rLRP2UymyYo_NficDXgtSaAdrGhtMgVEPZuqRrwPeBzETB_tmdv5UaEswF22ngncp3XF",
      embed = function(userPerformed,userSuffered,args)
        return {
          title = "Removeu um grupo",
          description = "Esse administrador removeu um grupo de alguém ou dele mesmo.",
          color = 2,
          fields = {
            {
              name = "Administrador",
              value = "```" .. userPerformed.id .. " - " .. userPerformed.name .. " " .. userPerformed.surname .. "```",
              inline = true
            },
            {
              name = "Jogador",
              value = "```" .. userSuffered.id .. " - " .. userSuffered.name .. " " .. userSuffered.surname .. "```",
              inline = true
            },
            {
              name = "Grupo",
              value = "```" .. args["1"] .. "```",
              inline = true
            },
            {
              name = "",
              value = os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S"),
              inline = false
            }
          }
        }
      end
    },
    ["addSalary"] = {
      link = "https://discord.com/api/webhooks/1225191463181222003/rLRP2UymyYo_NficDXgtSaAdrGhtMgVEPZuqRrwPeBzETB_tmdv5UaEswF22ngncp3XF",
      embed = function(userPerformed,userSuffered,args)
        return {
          title = "Adicionou um salário",
          description = "Esse administrador adicionou um salário pelo painel.",
          color = 2,
          fields = {
            {
              name = "Administrador",
              value = "```" .. userPerformed.id .. " - " .. userPerformed.name .. " " .. userPerformed.surname .. "```",
              inline = true
            },
            {
              name = "Jogador",
              value = "```" .. userSuffered.id .. " - " .. userSuffered.name .. " " .. userSuffered.surname .. "```",
              inline = true
            },
            {
              name = "Grupo",
              value = "```" .. args["1"] .. "```",
              inline = true
            },
            {
              name = "Salário",
              value = "```" .. args["2"] .. "```",
              inline = true
            },
            {
              name = "",
              value = os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S"),
              inline = false
            }
          }
        }
      end
    },
    ["remItem"] = {
      link = "https://discord.com/api/webhooks/1225191463181222003/rLRP2UymyYo_NficDXgtSaAdrGhtMgVEPZuqRrwPeBzETB_tmdv5UaEswF22ngncp3XF",
      embed = function(userPerformed,userSuffered,args)
        return {
          title = "Removeu um item",
          description = "Esse administrador removeu um item de alguém ou dele mesmo.",
          color = 2,
          fields = {
            {
              name = "Administrador",
              value = "```" .. userPerformed.id .. " - " .. userPerformed.name .. " " .. userPerformed.surname .. "```",
              inline = true
            },
            {
              name = "Jogador",
              value = "```" .. userSuffered.id .. " - " .. userSuffered.name .. " " .. userSuffered.surname .. "```",
              inline = true
            },
            {
              name = "Item",
              value = "```" .. args["1"] .. "```",
              inline = true
            },
            {
              name = "",
              value = os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S"),
              inline = false
            }
          }
        }
      end
    },
    ["remProperty"] = {
      link = "https://discord.com/api/webhooks/1225191463181222003/rLRP2UymyYo_NficDXgtSaAdrGhtMgVEPZuqRrwPeBzETB_tmdv5UaEswF22ngncp3XF",
      embed = function(userPerformed,userSuffered,args)
        return {
          title = "Removeu uma propriedade",
          description = "Esse administrador removeu uma propriedade de alguém ou dele mesmo.",
          color = 2,
          fields = {
            {
              name = "Administrador",
              value = "```" .. userPerformed.id .. " - " .. userPerformed.name .. " " .. userPerformed.surname .. "```",
              inline = true
            },
            {
              name = "Jogador",
              value = "```" .. userSuffered.id .. " - " .. userSuffered.name .. " " .. userSuffered.surname .. "```",
              inline = true
            },
            {
              name = "Propriedade",
              value = "```" .. args["1"] .. "```",
              inline = true
            },
            {
              name = "",
              value = os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S"),
              inline = false
            }
          }
        }
      end
    },
    ["addProperty"] = {
      link = "https://discord.com/api/webhooks/1225191463181222003/rLRP2UymyYo_NficDXgtSaAdrGhtMgVEPZuqRrwPeBzETB_tmdv5UaEswF22ngncp3XF",
      embed = function(userPerformed,userSuffered,args)
        return {
          title = "Adicionou uma propriedade",
          description = "Esse administrador adicionou uma propriedade para alguém ou para ele mesmo.",
          color = 2,
          fields = {
            {
              name = "Administrador",
              value = "```" .. userPerformed.id .. " - " .. userPerformed.name .. " " .. userPerformed.surname .. "```",
              inline = true
            },
            {
              name = "Jogador",
              value = "```" .. userSuffered.id .. " - " .. userSuffered.name .. " " .. userSuffered.surname .. "```",
              inline = true
            },
            {
              name = "Propriedade",
              value = "```" .. args["1"] .. "```",
              inline = true
            },
            {
              name = "",
              value = os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S"),
              inline = false
            }
          }
        }
      end
    },
    ["giveMoney"] = {
      link = "https://discord.com/api/webhooks/1225191463181222003/rLRP2UymyYo_NficDXgtSaAdrGhtMgVEPZuqRrwPeBzETB_tmdv5UaEswF22ngncp3XF",
      embed = function(userPerformed,userSuffered,args)
        return {
          title = "Spawnou dinheiro",
          description = "Esse administrador spawnou dinheiro",
          color = 2,
          fields = {
            {
              name = "Administrador",
              value = "```" .. userPerformed.id .. " - " .. userPerformed.name .. " " .. userPerformed.surname .. "```",
              inline = true
            },
            {
              name = "Jogador",
              value = "```" .. userSuffered.id .. " - " .. userSuffered.name .. " " .. userSuffered.surname .. "```",
              inline = true
            },
            {
              name = "Quantidade",
              value = "```" .. args["1"] .. "```",
              inline = true
            },
            {
              name = "",
              value = os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S"),
              inline = false
            }
          }
        }
      end
    },
    ["fix"] = {
      link = "https://discord.com/api/webhooks/1225191463181222003/rLRP2UymyYo_NficDXgtSaAdrGhtMgVEPZuqRrwPeBzETB_tmdv5UaEswF22ngncp3XF",
      embed = function(userPerformed,userSuffered,args)
        return {
          title = "Reparou um veículo",
          description = "Esse administrador reparou um veículo",
          color = 2,
          fields = {
            {
              name = "Administrador",
              value = "```" .. userPerformed.id .. " - " .. userPerformed.name .. " " .. userPerformed.surname .. "```",
              inline = true
            },
            {
              name = "",
              value = os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S"),
              inline = false
            }
          }
        }
      end
    },
    ["kill"] = {
      link = "https://discord.com/api/webhooks/1225191463181222003/rLRP2UymyYo_NficDXgtSaAdrGhtMgVEPZuqRrwPeBzETB_tmdv5UaEswF22ngncp3XF",
      embed = function(userPerformed,userSuffered,args)
        return {
          title = "Matou um jogador",
          description = "Esse administrador matou um jogador.",
          color = 2,
          fields = {
            {
              name = "Administrador",
              value = "```" .. userPerformed.id .. " - " .. userPerformed.name .. " " .. userPerformed.surname .. "```",
              inline = true
            },
            {
              name = "Jogador",
              value = "```" .. userSuffered.id .. " - " .. userSuffered.name .. " " .. userSuffered.surname .. "```",
              inline = true
            },
            {
              name = "",
              value = os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S"),
              inline = false
            }
          }
        }
      end
    },
    ["tpto"] = {
      link = "https://discord.com/api/webhooks/1225191463181222003/rLRP2UymyYo_NficDXgtSaAdrGhtMgVEPZuqRrwPeBzETB_tmdv5UaEswF22ngncp3XF",
      embed = function(userPerformed,userSuffered,args)
        return {
          title = "Teleportou",
          description = "Esse administrador teleportou para um jogador.",
          color = 2,
          fields = {
            {
              name = "Administrador",
              value = "```" .. userPerformed.id .. " - " .. userPerformed.name .. " " .. userPerformed.surname .. "```",
              inline = true
            },
            {
              name = "Jogador",
              value = "```" .. userSuffered.id .. " - " .. userSuffered.name .. " " .. userSuffered.surname .. "```",
              inline = true
            },
            {
              name = "",
              value = os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S"),
              inline = false
            }
          }
        }
      end
    },
    ["tptome"] = {
      link = "https://discord.com/api/webhooks/1225191463181222003/rLRP2UymyYo_NficDXgtSaAdrGhtMgVEPZuqRrwPeBzETB_tmdv5UaEswF22ngncp3XF",
      embed = function(userPerformed,userSuffered,args)
        return {
          title = "Teleportou",
          description = "Esse administrador teleportou um jogador para si mesmo.",
          color = 2,
          fields = {
            {
              name = "Administrador",
              value = "```" .. userPerformed.id .. " - " .. userPerformed.name .. " " .. userPerformed.surname .. "```",
              inline = true
            },
            {
              name = "Jogador",
              value = "```" .. userSuffered.id .. " - " .. userSuffered.name .. " " .. userSuffered.surname .. "```",
              inline = true
            },
            {
              name = "",
              value = os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S"),
              inline = false
            }
          }
        }
      end
    },
    ["god"] = {
      link = "https://discord.com/api/webhooks/1225191463181222003/rLRP2UymyYo_NficDXgtSaAdrGhtMgVEPZuqRrwPeBzETB_tmdv5UaEswF22ngncp3XF",
      embed = function(userPerformed,userSuffered,args)
        return {
          title = "God",
          description = "Esse administrador deu god em alguém ou nele mesmo.",
          color = 2,
          fields = {
            {
              name = "Administrador",
              value = "```" .. userPerformed.id .. " - " .. userPerformed.name .. " " .. userPerformed.surname .. "```",
              inline = true
            },
            {
              name = "Jogador",
              value = "```" .. userSuffered.id .. " - " .. userSuffered.name .. " " .. userSuffered.surname .. "```",
              inline = true
            },
            {
              name = "",
              value = os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S"),
              inline = false
            }
          }
        }
      end
    },
    ["armour"] = {
      link = "https://discord.com/api/webhooks/1225191463181222003/rLRP2UymyYo_NficDXgtSaAdrGhtMgVEPZuqRrwPeBzETB_tmdv5UaEswF22ngncp3XF",
      embed = function(userPerformed,userSuffered,args)
        return {
          title = "Colete",
          description = "Esse administrador deu colete para alguém ou para ele mesmo.",
          color = 2,
          fields = {
            {
              name = "Administrador",
              value = "```" .. userPerformed.id .. " - " .. userPerformed.name .. " " .. userPerformed.surname .. "```",
              inline = true
            },
            {
              name = "Jogador",
              value = "```" .. userSuffered.id .. " - " .. userSuffered.name .. " " .. userSuffered.surname .. "```",
              inline = true
            },
            {
              name = "",
              value = os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S"),
              inline = false
            }
          }
        }
      end
    },
    ["tuning"] = {
      link = "https://discord.com/api/webhooks/1225191463181222003/rLRP2UymyYo_NficDXgtSaAdrGhtMgVEPZuqRrwPeBzETB_tmdv5UaEswF22ngncp3XF",
      embed = function(userPerformed,userSuffered,args)
        return {
          title = "Tuning",
          description = "Esse administrador deu tuning em um veículo.",
          color = 2,
          fields = {
            {
              name = "Administrador",
              value = "```" .. userPerformed.id .. " - " .. userPerformed.name .. " " .. userPerformed.surname .. "```",
              inline = true
            },
            {
              name = "Jogador",
              value = "```" .. userSuffered.id .. " - " .. userSuffered.name .. " " .. userSuffered.surname .. "```",
              inline = true
            },
            {
              name = "",
              value = os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S"),
              inline = false
            }
          }
        }
      end
    },
    ["unwl"] = {
      link = "https://discord.com/api/webhooks/1225191463181222003/rLRP2UymyYo_NficDXgtSaAdrGhtMgVEPZuqRrwPeBzETB_tmdv5UaEswF22ngncp3XF",
      embed = function(userPerformed,userSuffered,args)
        return {
          title = "UnWL",
          description = "Esse administrador removeu a whitelist de um jogador.",
          color = 2,
          fields = {
            {
              name = "Administrador",
              value = "```" .. userPerformed.id .. " - " .. userPerformed.name .. " " .. userPerformed.surname .. "```",
              inline = true
            },
            {
              name = "Jogador",
              value = "```" .. userSuffered.id .. " - " .. userSuffered.name .. " " .. userSuffered.surname .. "```",
              inline = true
            },
            {
              name = "",
              value = os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S"),
              inline = false
            }
          }
        }
      end
    },
    ["kick"] = {
      link = "https://discord.com/api/webhooks/1225191463181222003/rLRP2UymyYo_NficDXgtSaAdrGhtMgVEPZuqRrwPeBzETB_tmdv5UaEswF22ngncp3XF",
      embed = function(userPerformed,userSuffered,args)
        return {
          title = "Kick",
          description = "Esse administrador expulsou um jogador.",
          color = 2,
          fields = {
            {
              name = "Administrador",
              value = "```" .. userPerformed.id .. " - " .. userPerformed.name .. " " .. userPerformed.surname .. "```",
              inline = true
            },
            {
              name = "Jogador",
              value = "```" .. userSuffered.id .. " - " .. userSuffered.name .. " " .. userSuffered.surname .. "```",
              inline = true
            },
            {
              name = "",
              value = os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S"),
              inline = false
            }
          }
        }
      end
    },
    ["spectate"] = {
      link = "https://discord.com/api/webhooks/1225191463181222003/rLRP2UymyYo_NficDXgtSaAdrGhtMgVEPZuqRrwPeBzETB_tmdv5UaEswF22ngncp3XF",
      embed = function(userPerformed,userSuffered,args)
        return {
          title = "Spectate",
          description = "Esse administrador está telando um jogador.",
          color = 2,
          fields = {
            {
              name = "Administrador",
              value = "```" .. userPerformed.id .. " - " .. userPerformed.name .. " " .. userPerformed.surname .. "```",
              inline = true
            },
            {
              name = "Jogador",
              value = "```" .. userSuffered.id .. " - " .. userSuffered.name .. " " .. userSuffered.surname .. "```",
              inline = true
            },
            {
              name = "",
              value = os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S"),
              inline = false
            }
          }
        }
      end
    },
    ["unspectate"] = {
      link = "https://discord.com/api/webhooks/1225191463181222003/rLRP2UymyYo_NficDXgtSaAdrGhtMgVEPZuqRrwPeBzETB_tmdv5UaEswF22ngncp3XF",
      embed = function(userPerformed,userSuffered,args)
        return {
          title = "Spectate",
          description = "Esse administrador parou de telar um jogador.",
          color = 2,
          fields = {
            {
              name = "Administrador",
              value = "```" .. userPerformed.id .. " - " .. userPerformed.name .. " " .. userPerformed.surname .. "```",
              inline = true
            },
            {
              name = "Jogador",
              value = "```" .. userSuffered.id .. " - " .. userSuffered.name .. " " .. userSuffered.surname .. "```",
              inline = true
            },
            {
              name = "",
              value = os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S"),
              inline = false
            }
          }
        }
      end
    },
    ["ban"] = {
      link = "https://discord.com/api/webhooks/1225191463181222003/rLRP2UymyYo_NficDXgtSaAdrGhtMgVEPZuqRrwPeBzETB_tmdv5UaEswF22ngncp3XF",
      embed = function(userPerformed,userSuffered,args)
        return {
          title = "Ban",
          description = "Esse administrador baniu um jogador.",
          color = 2,
          fields = {
            {
              name = "Administrador",
              value = "```" .. userPerformed.id .. " - " .. userPerformed.name .. " " .. userPerformed.surname .. "```",
              inline = true
            },
            {
              name = "Jogador",
              value = "```" .. userSuffered.id .. " - " .. userSuffered.name .. " " .. userSuffered.surname .. "```",
              inline = true
            },
            {
              name = "Tempo",
              value = "```" .. args["1"] .. "```",
              inline = true
            },
            {
              name = "",
              value = os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S"),
              inline = false
            }
          }
        }
      end
    },
    ["unban"] = {
      link = "https://discord.com/api/webhooks/1225191463181222003/rLRP2UymyYo_NficDXgtSaAdrGhtMgVEPZuqRrwPeBzETB_tmdv5UaEswF22ngncp3XF",
      embed = function(userPerformed,userSuffered,args)
        return {
          title = "Ban",
          description = "Esse administrador baniu um jogador.",
          color = 2,
          fields = {
            {
              name = "Administrador",
              value = "```" .. userPerformed.id .. " - " .. userPerformed.name .. " " .. userPerformed.surname .. "```",
              inline = true
            },
            {
              name = "Jogador",
              value = "```" .. userSuffered.id .. " - " .. userSuffered.name .. " " .. userSuffered.surname .. "```",
              inline = true
            },
            {
              name = "",
              value = os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S"),
              inline = false
            }
          }
        }
      end
    },
    ["chat"] = {
      link = "https://discord.com/api/webhooks/1225191463181222003/rLRP2UymyYo_NficDXgtSaAdrGhtMgVEPZuqRrwPeBzETB_tmdv5UaEswF22ngncp3XF",
      embed = function(userPerformed,userSuffered,args)
        return {
          title = "Chat",
          description = "Esse administrador mandou uma mensagem no chat do painel.",
          color = 2,
          fields = {
            {
              name = "Administrador",
              value = "```" .. userPerformed.id .. " - " .. userPerformed.name .. " " .. userPerformed.surname .. "```",
              inline = true
            },
            {
              name = "Mensagem",
              value = "```" .. args["1"] .. "```",
              inline = true
            },
            {
              name = "",
              value = os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S"),
              inline = false
            }
          }
        }
      end
    },
    ["kickall"] = {
      link = "https://discord.com/api/webhooks/1225191463181222003/rLRP2UymyYo_NficDXgtSaAdrGhtMgVEPZuqRrwPeBzETB_tmdv5UaEswF22ngncp3XF",
      embed = function(userPerformed,userSuffered,args)
        return {
          title = "Kick All",
          description = "Esse administrador kickou todos os jogadores.",
          color = 2,
          fields = {
            {
              name = "Administrador",
              value = "```" .. userPerformed.id .. " - " .. userPerformed.name .. " " .. userPerformed.surname .. "```",
              inline = true
            },
            {
              name = "",
              value = os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S"),
              inline = false
            }
          }
        }
      end
    },
    ["delvehs"] = {
      link = "https://discord.com/api/webhooks/1225191463181222003/rLRP2UymyYo_NficDXgtSaAdrGhtMgVEPZuqRrwPeBzETB_tmdv5UaEswF22ngncp3XF",
      embed = function(userPerformed,userSuffered,args)
        return {
          title = "Deletou todos os veiculos",
          description = "Esse administrador deletou todos os veiculos.",
          color = 2,
          fields = {
            {
              name = "Administrador",
              value = "```" .. userPerformed.id .. " - " .. userPerformed.name .. " " .. userPerformed.surname .. "```",
              inline = true
            },
            {
              name = "",
              value = os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S"),
              inline = false
            }
          }
        }
      end
    },
    ["tpcds"] = {
      link = "https://discord.com/api/webhooks/1225191463181222003/rLRP2UymyYo_NficDXgtSaAdrGhtMgVEPZuqRrwPeBzETB_tmdv5UaEswF22ngncp3XF",
      embed = function(userPerformed,userSuffered,args)
        return {
          title = "Tpcds",
          description = "Esse administrador teleportou",
          color = 2,
          fields = {
            {
              name = "Administrador",
              value = "```" .. userPerformed.id .. " - " .. userPerformed.name .. " " .. userPerformed.surname .. "```",
              inline = true
            },
            {
              name = "CDS",
              value = "```" .. args["1"] .. "```",
              inline = true
            },
            {
              name = "",
              value = os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S"),
              inline = false
            }
          }
        }
      end
    },
    ["announce"] = {
      link = "https://discord.com/api/webhooks/1225191463181222003/rLRP2UymyYo_NficDXgtSaAdrGhtMgVEPZuqRrwPeBzETB_tmdv5UaEswF22ngncp3XF",
      embed = function(userPerformed,userSuffered,args)
        return {
          title = "Anuncio",
          description = "Esse administrador fez um anuncio.",
          color = 2,
          fields = {
            {
              name = "Administrador",
              value = "```" .. userPerformed.id .. " - " .. userPerformed.name .. " " .. userPerformed.surname .. "```",
              inline = true
            },
            {
              name = "Mensagem",
              value = "```" .. args["1"] .. "```",
              inline = true
            },
            {
              name = "",
              value = os.date("\n[Data]: %d/%m/%Y [Hora]: %H:%M:%S"),
              inline = false
            }
          }
        }
      end
    },
  }
}

Config.command = "paineladmin"

Config.maxHealth = 200
Config.deadHealth = 101
Config.banMessage = "Você tomou um banimento temporário de %s"

Config.staffGroups = {
  "Admin"
}

Config.salaryTimer = 1 -- Tempo em horas
Config.notifys = {
  salary = "Foi adicionado a sua conta bancária do salário do seu cargo %s no valor de %d."
}

exports('license', function () 
	return "SUA LICENÇA AQUI" 
end)