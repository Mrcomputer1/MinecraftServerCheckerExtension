(function(ext) {
	
	$.ajax({

        async:false,

        type:'GET',

        url:'https://mcapi.us/scripts/minecraft.js',

        data:null,
        
        success: function(){},

        dataType:'script'

    });
	
	ext._shutdown = function() {};
	
	ext._getStatus = function() {
		return {status:2, msg: 'Ready - Version 1.0 (Minecraft 1.8.3) - By: Mrcomputer1'};
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
		/*$.get("http://mcapi.us/server/status?ip=" + serverIP + "&port=" + serverPORT, function( data ) {
			var obj = JSON.parse(data);
			if(obj.online === true){
				return 1;
			}else{
				return 0;
			}
		});*/
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
			if(version === "1.8.3-1.8"){
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
				s = "1.8.3";
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
	
	var descriptor = {
		blocks: [
			['R', 'Is %s %n online?', 'isOnline', '', 25565],
			['R', 'Motd of %s %n', 'getMotd', '', 25565],
			['R', 'Online players of %s %n', 'getOnlinePlayers', '', 25565],
			['R', 'Max players of %s %n', 'getMaxPlayers', '', 25565],
			['R', 'Server Software of %s %n', 'getServerSoftware', '', 25565],
			['R', 'Is %s %n %m.mcVersion', 'isVersion', '', 25565, '1.8.3-1.8'],
			['R', 'Get Version %s %n', 'getVersion', '', 25565],
		],
		menus: {
			mcVersion: ["1.8.3-1.8", "1.8-pre3", "1.8-pre2", "1.8-pre1", "1.7.10-1.7.6", "1.7.5-1.7.1"]
		},
		url: 'http://Mrcomputer1.github.io/Mrcomputer1ScratchExtensions/MinecraftExtension.html'
	};
	
	ScratchExtensions.register('Minecraft Extension', descriptor, ext);
})({});
