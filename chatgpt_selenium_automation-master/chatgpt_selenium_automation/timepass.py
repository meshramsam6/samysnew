from handler.chatgpt_selenium_automation import ChatGPTAutomation

# Define the path where the chrome driver is installed on your computer
chrome_driver_path = r"C:\Users\durga\Downloads\chromedriver-win64\chromedriver-win64\chromedriver.exe"

# the sintax r'"..."' is required because the space in "Program Files" 
# in my chrome_path
chrome_path = r'""'

# Create an instance
chatgpt = ChatGPTAutomation(chrome_path, chrome_driver_path)