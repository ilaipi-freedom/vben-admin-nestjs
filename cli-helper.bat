
@echo off

if "%~1"=="" (
    echo ENTITY_NAME is required
    exit /b
)

if "%~2"=="" (
    echo APP_NAME is required
    exit /b
)

set "ENTITY_NAME=%~1"
set "APP_NAME=%~2"

call npx nest g --no-spec mo %ENTITY_NAME%

call npx nest g --no-spec co %ENTITY_NAME%

call npx nest g --no-spec s %ENTITY_NAME%

rem mv to app
move "src\%ENTITY_NAME%" "src\apps\%APP_NAME%"

