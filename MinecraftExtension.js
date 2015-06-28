(function(ext) {
	
	ext.success = false;
	
	$.ajax({

        async:false,

        type:'GET',

        url:'https://mcapi.us/scripts/minecraft.js',
		
        data:null,
        
        success: function(){ext.success = true;},
		
		error: function(){ext.success = false;},

        dataType:'script'

    });
	
	ext._shutdown = function() {};
	
	ext._getStatus = function() {
		if(ext.success){
			return {status: 2, msg: 'Ready - 1.0.6 (Minecraft 1.8.7) - By: Mrcomputer1'};
		}else{
			return {status: 1, msg: 'Failed to get the MCAPI.US Javascript file! Reload the page or check status.mcapi.us!'};
		}
	};
	
	ext.isOnline = function(serverIP, serverPORT, callback) {
		MinecraftAPI.getServerStatus(serverIP, {
			port: serverPORT
		}, function(err, status) {
			if(err) {alert("Something went wrong!");callback(0)}
			
			if(status.online === true){
				callback(1);
				return 1;
			}else{
				callback(0);
				return 0;
			}
		});
	};
	
	ext.getMotd = function(serverIP, serverPORT, callback) {
		MinecraftAPI.getServerStatus(serverIP, {
			port: serverPORT
		}, function(err, status){
			if(err) {alert("Something went wrong!");callback(0)}
			
			if(status.online === true){
				callback(status.motd);
				return status.motd;
			}else{
				callback(0);
				return 0;
			}
		});
	};
	
	ext.getOnlinePlayers = function(serverIP, serverPORT, callback) {
		MinecraftAPI.getServerStatus(serverIP, {
			port: serverPORT
		}, function(err, status){
			if(err) {alert("Something went wrong!");callback(0)}
			
			if(status.online === true){
				callback(status.players.now);
				return status.players.now;
			}else{
				callback(0);
				return 0;
			}
		});
	};
	
	ext.getMaxPlayers = function(serverIP, serverPORT, callback) {
		MinecraftAPI.getServerStatus(serverIP, {
			port: serverPORT
		}, function(err, status){
			if(err) {alert("Something went wrong!");callback(0)}
			
			if(status.online === true){
				callback(status.players.max);
				return status.players.max;
			}else{
				callback(0);
				return 0;
			}
		});
	};
	
	ext.getServerSoftware = function(serverIP, serverPORT, callback) {
		MinecraftAPI.getServerStatus(serverIP, {
			port: serverPORT
		}, function(err, status){
			if(err) {alert("Something went wrong!");callback(0)}
			
			if(status.online === true){
				callback(status.server.name);
				return status.server.name;
			}else{
				callback(0);
				return 0;
			}
		});
	};
	
	ext.isVersion = function(serverIP, serverPORT, version, callback){
		MinecraftAPI.getServerStatus(serverIP, {
			port: serverPORT
		}, function(err, status){
			if(err) {alert("Something went wrong!");callback(0)}
			
			var p = 0;
			if(version === "1.8.7-1.8"){
				p = 47;
			}else if(version === "1.8.5-1.8"){
				p = 47;
			}else if(version === "1.8-pre3"){
				p = 46;
			}else if(version === "1.8-pre2"){
				p = 45;
			}else if(version === "1.8-pre1"){
				p = 44;
			}else if(version === "1.7.10-1.7.6"){
				p = 5;
			}else if(version === "1.7.5-1.7.1pre"){
				p = 4;
			}
			
			
			
			if(status.online === true){
				if(p === status.server.protocol){
					callback(1);
					return 1;
				}else{
					callback(0);
					return 0;
				}
			}else{
				callback(-1);
				return -1;
			}
		});
	};
	
	ext.getVersion = function(serverIP, serverPORT, callback){
		MinecraftAPI.getServerStatus(serverIP, {
			port: serverPORT
		}, function(err, status){
			if(err) {alert("Something went wrong!");callback(0)}
			
			var s = "";
			if(status.server.protocol === 47){
				s = "1.8.7";
			}else if(status.server.protocol === 46){
				s = "1.8-pre3";
			}else if(status.server.protocol === 45){
				s = "1.8-pre2";
			}else if(status.server.protocol === 44){
				s = "1.8-pre1";
			}else if(status.server.protocol === 5){
				s = "1.7.10-1.7.6";
			}else if(status.server.protocol === 4){
				s = "1.7.5-1.7.1pre";
			}
			
			
			
			if(status.online === true){
				callback(s);
				return s;
			}else{
				callback(0);
				return 0;
			}
		});
	};
	
	ext.getMojangStatus = function(statusOf, callback){
		$.get("http://status.mojang.com/check/", {}, function(data){
			var id = -1;
			if(statusOf === "minecraft.net"){
				id = 0;
			}else if(statusOf === "session.minecraft.net"){
				id = 1;
			}else if(statusOf === "account.mojang.com"){
				id = 2;
			}else if(statusOf === "auth.mojang.com"){
				id = 3;
			}else if(statusOf === "skins.minecraft.net"){
				id = 4;
			}else if(statusOf === "authserver.mojang.com"){
				id = 5;
			}else if(statusOf === "sessionserver.mojang.com"){
				id = 6;
			}else if(statusOf === "api.mojang.com"){
				id = 7;
			}else if(statusOf === "textures.minecraft.net"){
				id = 8;
			}else{
				alert("Script Error!");
			}
			
			if(data[id][statusOf] === "green"){
				callback(1);
			}else if(data[id][statusOf] === "yellow"){
				callback(0);
			}else{
				callback(-1);
			}
		}, "json");
	};
	
	ext.getServerIP = function(server){
		if(server === "Mineplex US"){
			return "us.mineplex.com";
		}else if(server === "Mineplex EU"){
			return "eu.mineplex.com";
		}else if(server === "Shotbow Network US"){
			return "us.shotbow.net";
		}else if(server === "Shotbow Network EU"){
			return "eu.shotbow.net";
		}else if(server === "Minecade"){
			return "mineca.de";
		}else if(server === "The Nexus MC US"){
			return "hub.thenexusmc.com";
		}else if(server === "The Nexus MC EU"){
			return "eu.thenexusmc.com";
			//Other //V//
		}else if(server === "--[US]--"){
			return "";
		}else if(server === "--[EU]--"){
			return "";
		}else if(server === "--[Unknown]--"){
			return "";
		}else if(server === "----"){
			return "";
		}else if(server === "Suggest a server (Run the block, disable popup blocker)"){
			window.open("http://goo.gl/forms/2DEyZWFDQd", "_blank", "channelmode=yes,height=550,width=720,location=no,menubar=no,resizable=no,scrollbars=no,status=no,toolbar=no");
			return "";
		}
	};
	
	ext.getServerPort = function(server){
		if(server === "Mineplex US"){
			return 25565;
		}else if(server === "Mineplex EU"){
			return 25565;
		}else if(server === "Shotbow Network US"){
			return 25565;
		}else if(server === "Shotbow Network EU"){
			return 25565;
		}else if(server === "Minecade"){
			return 25565;
		}else if(server === "The Nexus MC US"){
			return 25565;
		}else if(server === "The Nexus MC EU"){
			return 25565;
			//Other //V//
		}else if(server === "--[US]--"){
			return "";
		}else if(server === "--[EU]--"){
			return "";
		}else if(server === "--[Unknown]--"){
			return "";
		}else if(server === "----"){
			return "";
		}else if(server === "Suggest a server (Run the block, disable popup blocker)"){
			window.open("http://goo.gl/forms/2DEyZWFDQd", "_blank", "channelmode=yes,height=550,width=720,location=no,menubar=no,resizable=no,scrollbars=no,status=no,toolbar=no");
			return "";
		}
	};
	
	ext.isBoolean = function(s){
		if(s == "1"){
			return true;
		}else if(s == "0"){
			return false;
		}else if(s == "-1"){
			return false;
		}else{
			return false;
		}
	};
	
	var descriptor = {
		blocks: [
			['R', 'Is %s %n online?', 'isOnline', '', 25565],
			['R', 'Motd of %s %n', 'getMotd', '', 25565],
			['R', 'Online players of %s %n', 'getOnlinePlayers', '', 25565],
			['R', 'Max players of %s %n', 'getMaxPlayers', '', 25565],
			['R', 'Server Software of %s %n', 'getServerSoftware', '', 25565],
			['R', 'Is %s %n %m.mcVersion', 'isVersion', '', 25565, '1.8.7-1.8'],
			['R', 'Get Version %s %n', 'getVersion', '', 25565],
			['R', 'Get Mojang Status %m.mojangStatus', 'getMojangStatus', 'minecraft.net'],
			['r', 'Server IP %m.server', 'getServerIP', ''],
			['r', 'Server Port %m.server', 'getServerPort', ''],
			['b', '%s Turns is blocks into booleans', 'isBoolean', ''],
		],
		menus: {
			mcVersion: ["1.8.7-1.8", "1.8-pre3", "1.8-pre2", "1.8-pre1", "1.7.10-1.7.6", "1.7.5-1.7.1"],
			mojangStatus: ["minecraft.net", "session.minecraft.net", "account.mojang.com", "auth.mojang.com", "skins.minecraft.net", "authserver.mojang.com", "sessionserver.mojang.com", "api.mojang.com", "textures.minecraft.net"],
			server: ['--[US]--', 'Mineplex US', 'Shotbow Network US', 'The Nexus MC US', '--[EU]--', 'Mineplex EU', 'Shotbow Network EU', 'The Nexus MC EU', '--[Unknown]--', 'Minecade', '----', 'Suggest a server (Run the block, disable popup blocker)']
		},
		url: 'http://Mrcomputer1.github.io/MinecraftServerCheckerExtension/'
	};
	
	ScratchExtensions.register('Minecraft Server Checker', descriptor, ext);
})({});
