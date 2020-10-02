$token = Read-Host "Bot's token"
$prefix = Read-Host "Bot's prefix"
$owner = Read-Host "Bot's owner"
$invite = Read-Host "Support server invite"
$status = Read-Host "Bot's status"
$web_port = Read-Host "Port for WebUI"

$env:DIO_TOKEN=$token
$env:DIO_PREFIX=$prefix
$env:DIO_OWNER=$owner
$env:DIO_INVITE=$invite
$env:DIO_STATUS=$status
$env:DIO_WEB_PORT=$web_port