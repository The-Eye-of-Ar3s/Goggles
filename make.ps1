npm run clean:environment | out-null
npm run build:unzipped | out-null
if (Test-Path -Path C:\Games\DEV\user\mods\Goggles\) {
    Remove-Item -Recurse -Force C:\Games\DEV\user\mods\Goggles\ | out-null
}
mkdir C:\Games\DEV\user\mods\Goggles\ | out-null
Copy-Item -Recurse -Path .\* -Destination C:\Games\DEV\user\mods\Goggles\ | out-null
Remove-Item C:\Games\DEV\user\mods\Goggles\make.ps1 | out-null
Remove-Item C:\Games\DEV\user\mods\Goggles\TESTCASES.md | out-null
Set-Location C:\Games\DEV\ | out-null
Start-Process powershell {./Aki.Server.exe}
Start-Process powershell {./Aki.Launcher.exe}
Set-Location C:\Users\TheEyeOfAr3s\Documents\coding\SPTarkov\Goggles++\ | out-null