@echo off
cd /d "%~dp0android"
"C:\Program Files\Android\Android Studio\jbr\bin\keytool.exe" -genkeypair -v -keystore nutriflow-release-key.keystore -alias nutriflow -keyalg RSA -keysize 2048 -validity 10000 -storepass nutriflow2024 -keypass nutriflow2024 -dname "CN=NutriFlow AI, OU=Mobile, O=Surya, L=Unknown, S=Unknown, C=IN"
echo.
echo Keystore generated successfully!
pause
