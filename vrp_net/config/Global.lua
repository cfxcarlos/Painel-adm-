-----------------------------------------------------------------------------------------------------------------------------------------
-- VARIABLES
-----------------------------------------------------------------------------------------------------------------------------------------
MaxRepair = 1
MinimumWeight = 15
CreatorCoords = vec4(-2006.95,2960.77,31.81,305.82)
-----------------------------------------------------------------------------------------------------------------------------------------
-- BATTLEPASS
-----------------------------------------------------------------------------------------------------------------------------------------
BATTLEPASS_POINTS = 500
BATTLEPASS_PRICE = 10000
BATTLEPASS_START = 1744165448
-----------------------------------------------------------------------------------------------------------------------------------------
-- SERVERINFO
-----------------------------------------------------------------------------------------------------------------------------------------
Currency = "$"
DiscordBot = false
BaseMode = "steam"
Whitelisted = false
Liberation = "Token"
NameDefault = "Indivíduo Indigente"
-----------------------------------------------------------------------------------------------------------------------------------------
-- SERVER
-----------------------------------------------------------------------------------------------------------------------------------------
ServerName = "Creative Network"
ServerLink = "https://creativenetwork.dev.br"
ServerAvatar = "https://i.imgur.com/Yih0uoA.png"
-----------------------------------------------------------------------------------------------------------------------------------------
-- SPAWNCOORDS
-----------------------------------------------------------------------------------------------------------------------------------------
SpawnCoords = {
	vec3(895.48,-179.38,73.7)
}
-----------------------------------------------------------------------------------------------------------------------------------------
-- TEXTUREPACK
-----------------------------------------------------------------------------------------------------------------------------------------
TexturePack = {
	"Drop","E","H","Normal","Selected"
}
-----------------------------------------------------------------------------------------------------------------------------------------
-- THEME
-----------------------------------------------------------------------------------------------------------------------------------------
Theme = {
	shadow = true,
	main = "#5865f2",
	mainText = "#ffffff",
	currency = Currency,
	items = ListItem,

	common = "#6fc66a",
	rare = "#6ac6c5",
	epic = "#c66a75",
	legendary = "#c6986a",
	accept = {
		letter = "#dcffe9",
		background = "#3fa466"
	},
	reject = {
		letter = "#ffe8e8",
		background = "#ad4443"
	},
	loading = {
		mode = "dark", -- [ Opções disponíveis: dark,light ],
		model = 2, -- [ Opções disponíveis: 1,2 ],
		progress = true -- [ Opções disponíveis: true, false ],
	},
	chat = {
		LSPD = {
			background = "#16468b",
			letter = "#ffffff"
		},
		BCSO = {
			background = "#463939",
			letter = "#ffffff"
		},
		BCPR = {
			background = "#2d402d",
			letter = "#ffffff"
		},
		Paramedico = {
			background = "#9f1918",
			letter = "#ffffff"
		},
		Families = {
			background = "#4d7a06",
			letter = "#ffffff"
		},
		Ballas = {
			background = "#430d8e",
			letter = "#ffffff"
		},
		Vagos = {
			background = "#948209",
			letter = "#ffffff"
		}
	},
	hud = {
		modes = {
			info = 3, -- [ Opções disponíveis: 1,2,3 ],
			icon = "fill", -- [ Opções disponíveis: fill,line ],
			status = 10, -- [ Opções disponíveis: 1 a 12 ],
			vehicle = 3 -- [ Opções disponíveis: 1,2,3 ]
		},
		percentage = true,
		icons = "#FFFFFF",
		nitro = "#f69d2a",
		rpm = "#FFFFFF",
		fuel = "#f94c54",
		engine = "#ff4c55",
		health = "#76B984",
		armor = "#A66FED",
		hunger = "#F4B266",
		thirst = "#7FC8F8",
		stress = "#E287C9",
		luck = "#F18A7C",
		dexterity = "#E4E76E",
		repose = "#7FCCC7",
		pointer = "#ef4444",
		progress = {
			background = "#FFFFFF",
			circle = "#5865f2",
			letter = "#FFFFFF"
		}
	},
	notifyitem = {
		add = {
			letter = "#dcffe9",
			background = "#3fa466"
		},
		remove = {
			letter = "#ffe8e8",
			background = "#ad4443"
		}
	},
	pause = {
		premium = true,
		propertys = true,
		store = true,
		battlepass = true,
		boxes = true,
		marketplace = true,
		skinweapon = true,
		ranking = true,
		daily = true,
		code = true,
		map = true,
		settings = true,
		hud = true,
		disconnect = true
	},
	scripts = {
		taximeter = {
			main = "#efcf2f",
			mainText = "#120b02"
		}
	}
}
-----------------------------------------------------------------------------------------------------------------------------------------
-- GROUPS
-----------------------------------------------------------------------------------------------------------------------------------------
Groups = {
	Admin = {
		Permission = {
			Admin = true
		},
		Hierarchy = { "Administrador","Moderador","Suporte" },
		Name = "Administradores",
		Service = {},
		Chat = true,
		Max = 30
	},
	Ouro = {
		Permission = {
			Ouro = true
		},
		Hierarchy = { "Membro" },
		Salary = { 3750 },
		Backpack = { 25 },
		Service = {},
		Block = true
	},
	Prata = {
		Permission = {
			Prata = true
		},
		Hierarchy = { "Membro" },
		Salary = { 2500 },
		Backpack = { 15 },
		Service = {},
		Block = true
	},
	Bronze = {
		Permission = {
			Bronze = true
		},
		Hierarchy = { "Membro" },
		Salary = { 1250 },
		Backpack = { 5 },
		Service = {},
		Block = true
	},
	LSPD = {
		Permission = {
			LSPD = true
		},
		Hierarchy = { "Chefe","Capitão","Tenente","Sargento","Oficial","Cadete" },
		Salary = { 3750,3625,3500,3375,3250,3125 },
		Name = "Los Santos Police Department",
		Service = {},
		Type = "Work",
		Markers = true,
		Chat = true
	},
	BCSO = {
		Permission = {
			BCSO = true
		},
		Hierarchy = { "Chefe","Capitão","Tenente","Sargento","Oficial","Cadete" },
		Salary = { 3750,3625,3500,3375,3250,3125 },
		Name = "Blaine County Sheriff Officer",
		Service = {},
		Type = "Work",
		Markers = true,
		Chat = true
	},
	SAPR = {
		Permission = {
			SAPR = true
		},
		Hierarchy = { "Chefe","Capitão","Tenente","Sargento","Oficial","Cadete" },
		Salary = { 3750,3625,3500,3375,3250,3125 },
		Name = "San Andreas Park Ranger",
		Service = {},
		Type = "Work",
		Markers = true,
		Chat = true
	},
	Paramedico = {
		Permission = {
			Paramedico = true
		},
		Hierarchy = { "Chefe","Médico","Enfermeiro","Residente" },
		Salary = { 3750,3625,3500,3375 },
		Service = {},
		Type = "Work",
		Markers = true,
		Chat = true
	},
	Ballas = {
		Permission = {
			Ballas = true
		},
		Hierarchy = { "Líder","Sub-Líder","Membro","Recruta" },
		Domination = true,
		Service = {},
		Type = "Work"
	},
	Vagos = {
		Permission = {
			Vagos = true
		},
		Hierarchy = { "Líder","Sub-Líder","Membro","Recruta" },
		Domination = true,
		Service = {},
		Type = "Work"
	},
	Families = {
		Permission = {
			Families = true
		},
		Hierarchy = { "Líder","Sub-Líder","Membro","Recruta" },
		Domination = true,
		Service = {},
		Type = "Work"
	},
	Marabunta = {
		Permission = {
			Marabunta = true
		},
		Hierarchy = { "Líder","Sub-Líder","Membro","Recruta" },
		Domination = true,
		Service = {},
		Type = "Work"
	},
	Aztecas = {
		Permission = {
			Aztecas = true
		},
		Hierarchy = { "Líder","Sub-Líder","Membro","Recruta" },
		Domination = true,
		Service = {},
		Type = "Work"
	},
	Bennys = {
		Permission = {
			Bennys = true
		},
		Hierarchy = { "Líder","Sub-Líder","Membro","Recruta" },
		Service = {},
		Type = "Work"
	},
	Bahamas = {
		Permission = {
			Bahamas = true
		},
		Hierarchy = { "Líder","Sub-Líder","Membro","Recruta" },
		Service = {},
		Type = "Work"
	},
	Restaurante = {
		Permission = {
			Restaurante = true
		},
		Hierarchy = { "Chefe","Supervisor","Funcionário" },
		Service = {},
		Type = "Work"
	},
	Booster = {
		Permission = {
			Booster = true
		},
		Hierarchy = { "Membro" },
		Service = {},
		Salary = { 2500 },
		Block = true
	},
	Freecam = {
		Permission = {
			Freecam = true
		},
		Hierarchy = { "Membro" },
		Service = {},
		Block = true
	},
	Policia = {
		Permission = {
			LSPD = true,
			BCSO = true,
			SAPR = true
		},
		Hierarchy = { "Membro" },
		Block = true
	},
	Emergencia = {
		Permission = {
			LSPD = true,
			BCSO = true,
			SAPR = true,
			Paramedico = true
		},
		Hierarchy = { "Membro" },
		Block = true
	},
	-- FUELSTATION
	FuelStation01 = {
		Permission = {
			FuelStation01 = true
		},
		Hierarchy = { "Proprietário","Gerente","Atendente","Frentista" },
		Service = {},
		Type = "Fuel"
	},
	-- PROPRIEDADES
	Mansao01 = { -- Exemplo de propriedade com painel/permissão
		Permission = {
			Mansao01 = true
		},
		Name = "Mansão",
		Hierarchy = { "Proprietário","Morador" },
		Type = "Propertys",
		Service = {},
		Client = true,
		Max = 5
	}
}
-----------------------------------------------------------------------------------------------------------------------------------------
-- CHARACTERITENS
-----------------------------------------------------------------------------------------------------------------------------------------
CharacterItens = {
	["soda"] = 2,
	["identity"] = 1,
	["hamburger"] = 2
}
-----------------------------------------------------------------------------------------------------------------------------------------
-- BOXES
-----------------------------------------------------------------------------------------------------------------------------------------
Boxes = {
	["treasurebox"] = {
		Multiplier = { Min = 1, Max = 1 },
		List = {
			{ Item = "dollar", Chance = 100, Min = 4250, Max = 6250 }
		}
	},
	["christmas_04"] = {
		Multiplier = { Min = 1, Max = 1 },
		List = {
			{ Item = "christmas_01", Chance = 100, Min = 1, Max = 1 },
			{ Item = "christmas_02", Chance = 100, Min = 1, Max = 1 },
			{ Item = "christmas_03", Chance = 100, Min = 1, Max = 1 }
		}
	}
}
-----------------------------------------------------------------------------------------------------------------------------------------
-- UPPERLEVEL
-----------------------------------------------------------------------------------------------------------------------------------------
UpperLevel = {
	["Trucker"] = { -- Experiência do emprego
		["2"] = { -- Nível que vai receber a recompensa
			{ Item = "bandage", Min = 1, Max = 2 },
			{ Item = "advtoolbox", Min = 1, Max = 1 }
		}
	}
}
-----------------------------------------------------------------------------------------------------------------------------------------
-- SKINSHOPINIT
-----------------------------------------------------------------------------------------------------------------------------------------
SkinshopInit = {
	["mp_m_freemode_01"] = {
		pants = { item = 4, texture = 1 },
		arms = { item = 0, texture = 0 },
		tshirt = { item = 15, texture = 0 },
		torso = { item = 273, texture = 0 },
		vest = { item = 0, texture = 0 },
		shoes = { item = 1, texture = 6 },
		mask = { item = 0, texture = 0 },
		backpack = { item = 0, texture = 0 },
		hat = { item = -1, texture = 0 },
		glass = { item = 0, texture = 0 },
		ear = { item = -1, texture = 0 },
		watch = { item = -1, texture = 0 },
		bracelet = { item = -1, texture = 0 },
		accessory = { item = 0, texture = 0 },
		decals = { item = 0, texture = 0 }
	},
	["mp_f_freemode_01"] = {
		pants = { item = 4, texture = 1 },
		arms = { item = 14, texture = 0 },
		tshirt = { item = 3, texture = 0 },
		torso = { item = 338, texture = 2 },
		vest = { item = 0, texture = 0 },
		shoes = { item = 1, texture = 6 },
		mask = { item = 0, texture = 0 },
		backpack = { item = 0, texture = 0 },
		hat = { item = -1, texture = 0 },
		glass = { item = 0, texture = 0 },
		ear = { item = -1, texture = 0 },
		watch = { item = -1, texture = 0 },
		bracelet = { item = -1, texture = 0 },
		accessory = { item = 0, texture = 0 },
		decals = { item = 0, texture = 0 }
	}
}
-----------------------------------------------------------------------------------------------------------------------------------------
-- BARBERSHOPINIT
-----------------------------------------------------------------------------------------------------------------------------------------
BarbershopInit = {
	mp_m_freemode_01 = { 13,25,0,3,0,-1,-1,-1,-1,13,38,38,0,0,0,0,0.5,0,0,1,0,10,1,0,1,0.5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,38 },
	mp_f_freemode_01 = { 13,25,1,3,0,-1,-1,-1,-1,1,38,38,0,0,0,0,1,0,0,1,0,0,0,0,1,0.5,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,38 }
}