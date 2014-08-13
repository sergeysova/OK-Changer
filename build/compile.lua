
function Folder.Parent( folder )
	p = String.ReverseFind(folder, "\\", false);
	if ( p == String.Length(folder) ) then
		folder = String.Left(folder, String.Length(folder)-1);
	end
	p = String.ReverseFind(folder, "\\", false);
	parent = String.Left(folder, p-1);
	return parent;
end

function Folder.SafeCreate( folder )
	if ( Folder.DoesExist(folder) ~= true ) then
		Folder.Create(folder);
	end
end

function File.SafeDelete( file )
	if ( File.DoesExists( file ) ) then
		File.Delete( file );
	end
end

function ll()
	Input.ScrollToLine("log", -1);
end

Log("------------------------------------------------");

if ( String.CompareFileVersions(version, "0.0.0.1") >= 0 ) then
	Log("Build version: " .. version);
	Log("");
	
	sourceFolder = Folder.Parent(_SourceFolder) .. "\\source\\";
	releaseFolder = Folder.Parent(_SourceFolder) .. "\\release\\";
	buildFolder = Folder.Parent(_SourceFolder) .. "\\build\\";
	
	Folder.SafeCreate(releaseFolder);
	--Folder.SafeCreate(debugFolder);
	
	Application.RunScriptFile(_SourceFolder .. "\\chrome.lua");
	--Application.RunScriptFile(_SourceFolder .. "\\yandex.lua");
	Application.RunScriptFile(_SourceFolder .. "\\opera.lua");
	
	Log("");
else
	Log("Compilation error: enter valid version!\r\n");
end


Log("------------------------------------------------");
ll();