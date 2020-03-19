# PowerShell

https://msdn.microsoft.com/en-us/powershell/scripting/powershell-scripting

### Listing Alias, Finding Command's Alias

```powershell
# show existing aliases
Get-Alias

# list all aliases ending in r (“Get-Alias” as alias of “gal”)
Get-Alias *r

# find the cmdlet of alias “dir”
Get-Alias dir

# or, simply use help
help dir
```

```txt
% -> ForEach-Object
? -> Where-Object
?? -> Invoke-NullCoalescing
ac -> Add-Content
asnp -> Add-PSSnapin
cat -> Get-Content
cd -> Set-Location
CFS -> ConvertFrom-String
chdir -> Set-Location
clc -> Clear-Content
clear -> Clear-Host
clhy -> Clear-History
cli -> Clear-Item
clp -> Clear-ItemProperty
cls -> Clear-Host
clv -> Clear-Variable
cnsn -> Connect-PSSession
compare -> Compare-Object
copy -> Copy-Item
cp -> Copy-Item
cpi -> Copy-Item
cpp -> Copy-ItemProperty
curl -> Invoke-WebRequest
cvpa -> Convert-Path
dbp -> Disable-PSBreakpoint
del -> Remove-Item
diff -> Compare-Object
dir -> Get-ChildItem
dnsn -> Disconnect-PSSession
ebp -> Enable-PSBreakpoint
echo -> Write-Output
epal -> Export-Alias
epcsv -> Export-Csv
epsn -> Export-PSSession
erase -> Remove-Item
etsn -> Enter-PSSession
exsn -> Exit-PSSession
fc -> Format-Custom
fhx -> Format-Hex
fl -> Format-List
foreach -> ForEach-Object
ft -> Format-Table
fw -> Format-Wide
gal -> Get-Alias
gbp -> Get-PSBreakpoint
gc -> Get-Content
gcb -> Get-Clipboard
gci -> Get-ChildItem
gcm -> Get-Command
gcs -> Get-PSCallStack
gdr -> Get-PSDrive
ghy -> Get-History
gi -> Get-Item
gin -> Get-ComputerInfo
gjb -> Get-Job
gl -> Get-Location
gm -> Get-Member
gmo -> Get-Module
gp -> Get-ItemProperty
gps -> Get-Process
gpv -> Get-ItemPropertyValue
group -> Group-Object
gsn -> Get-PSSession
gsnp -> Get-PSSnapin
gsv -> Get-Service
gtz -> Get-TimeZone
gu -> Get-Unique
gv -> Get-Variable
gwmi -> Get-WmiObject
h -> Get-History
history -> Get-History
icm -> Invoke-Command
iex -> Invoke-Expression
ihy -> Invoke-History
ii -> Invoke-Item
ipal -> Import-Alias
ipcsv -> Import-Csv
ipmo -> Import-Module
ipsn -> Import-PSSession
irm -> Invoke-RestMethod
ise -> powershell_ise.exe
iwmi -> Invoke-WmiMethod
iwr -> Invoke-WebRequest
kill -> Stop-Process
lp -> Out-Printer
ls -> Get-ChildItem
man -> help
md -> mkdir
measure -> Measure-Object
mi -> Move-Item
mount -> New-PSDrive
move -> Move-Item
mp -> Move-ItemProperty
mv -> Move-Item
nal -> New-Alias
ndr -> New-PSDrive
ni -> New-Item
nmo -> New-Module
npssc -> New-PSSessionConfigurationFile
nsn -> New-PSSession
nv -> New-Variable
ogv -> Out-GridView
oh -> Out-Host
popd -> Pop-Location
ps -> Get-Process
pushd -> Push-Location
pwd -> Get-Location
r -> Invoke-History
rbp -> Remove-PSBreakpoint
rcjb -> Receive-Job
rcsn -> Receive-PSSession
rd -> Remove-Item
rdr -> Remove-PSDrive
ren -> Rename-Item
ri -> Remove-Item
rjb -> Remove-Job
rm -> Remove-Item
rmdir -> Remove-Item
rmo -> Remove-Module
rni -> Rename-Item
rnp -> Rename-ItemProperty
rp -> Remove-ItemProperty
rsn -> Remove-PSSession
rsnp -> Remove-PSSnapin
rujb -> Resume-Job
rv -> Remove-Variable
rvpa -> Resolve-Path
rwmi -> Remove-WmiObject
sajb -> Start-Job
sal -> Set-Alias
saps -> Start-Process
sasv -> Start-Service
sbp -> Set-PSBreakpoint
sc -> Set-Content
scb -> Set-Clipboard
select -> Select-Object
set -> Set-Variable
shcm -> Show-Command
si -> Set-Item
sl -> Set-Location
sleep -> Start-Sleep
sls -> Select-String
sort -> Sort-Object
sp -> Set-ItemProperty
spjb -> Stop-Job
spps -> Stop-Process
spsv -> Stop-Service
start -> Start-Process
stz -> Set-TimeZone
sujb -> Suspend-Job
sv -> Set-Variable
swmi -> Set-WmiInstance
tee -> Tee-Object
trcm -> Trace-Command
type -> Get-Content
vi -> vim
vim -> D:\Program Files\cmder\vendor\git-for-wi...
wget -> Invoke-WebRequest
where -> Where-Object
wjb -> Wait-Job
write -> Write-Output
```

### Using Cmd.exe Variables

Although Windows PowerShell is not Cmd.exe, it runs in a command shell environment and can use the same variables available in any environment in Windows. These variables are exposed through a drive named `env:`. You can view these variables by typing:

```powershell
> Get-ChildItem env:
```

Although the standard variable cmdlets are not designed to work with `env:` variables, you can still use them by specifying the `env:` prefix. For example, to see the operating system root directory, you can use the command-shell `%SystemRoot%` variable from within Windows PowerShell by typing:

```powershell
> $env:SystemRoot
C:\WINDOWS
```

You can also create and modify environment variables from within Windows PowerShell. Environment variables accessed from Windows PowerShell conform to the normal rules for environment variables elsewhere in Windows.