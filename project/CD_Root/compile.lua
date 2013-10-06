Log("");

if ( String.CompareFileVersions(version, "0.0.0.1") >= 0 ) then
	Log("Build version: " .. version);
	
	
else
	Log("Compilation error: the valid version!\r\n");
end