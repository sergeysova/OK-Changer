Log("\r\n[=- Opera build -=]");

-- ChromeBuildFolder = buildFolder .. "chrome\\";
OperaBuildFolder = buildFolder .. "opera\\";
Folder.SafeCreate(OperaBuildFolder);
Log("Copy files to: " .. OperaBuildFolder);

last = "";

function copycallback( source, dest, copied, total, fcopied, ftotal )
	if ( last == dest ) then
		return true;
	end;
	if ( dest ~= "" ) then
		Log("" .. dest);
		last = dest;
	end;
	
	return true;
end


-- Copy source files to build folder
File.Copy(ChromeBuildFolder .. "*.*", OperaBuildFolder, true, true, false, true, copycallback);

Log("\r\n[ Pack opera extension from folder ]");
Log(OperaBuildFolder);
