Log("[=- Chrome build -=]");

ChromeBuildFolder = buildFolder .. "chrome\\";
Log("Copy files to: " .. ChromeBuildFolder);

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

function zipcallback( dest, percent, status )
	if ( status == 0 ) then
		return true;
	end;
	
	return copycallback( "", dest, "", "", "", "");
end


-- Copy source files to build folder
File.Copy(sourceFolder .. "*.*", ChromeBuildFolder, true, true, false, true, copycallback);


name = "okchanger_" .. version .. "-chrome.zip";
File.Delete( releaseFolder .. name );

Log("\r\n[ Update manifest ]");
-- Copy pattern manifest file
File.Copy(_SourceFolder.."\\chrome-manifest.json", ChromeBuildFolder.."\\manifest.json", false, true, false, true, nil);


-- replace %version% to real version
manifest = TextFile.ReadToString(ChromeBuildFolder.."manifest.json");
manifest = String.Replace(manifest, "%version%", version, false);
manifest = String.Replace(manifest, "0.0.0.0", version, false);
TextFile.WriteFromString(ChromeBuildFolder.."manifest.json", manifest, false);
Log("OK")



Log("\r\n[ Minimizing javascript ]");
function workfile(path)
	Log(path);
	File.Run("java.exe", "-jar compiler.jar --js " .. path .. " --js_output_file " .. path .. ".minjs", _SourceFolder, SW_HIDE, true);
	File.Delete(path, false, false, false, nil);
	File.Rename(path..".minjs", path );
	
	return true;
end

File.Find(ChromeBuildFolder, "*.js", true, true, nil, workfile);

Log("\r\n[ Zip ]");
-- Adding to zip
Zip.Add( releaseFolder .. name, {ChromeBuildFolder .. "*.*"}, true, "", 0, zipcallback, true);

-- Move back pattern manifest file with overwrite
File.Move(Folder.Parent(ChromeBuildFolder).."\\manifest.json", ChromeBuildFolder.."manifest.json", true, true, false, false, nil);

Log("\r\n[ Output file ]");
Log(releaseFolder .. name);
