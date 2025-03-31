Index


S.No.
Title
Page No.
1
Hardware and Software Requirements
3
2
Software implementation through Flow Diagrams
4
3
List of Python Libraries used
7
4
Environment Details
8
5
List of APIs Used
9
6
Test Cases
11
7
List of Files for Executing the Program
14
8
Steps to Execute the Program
14
9
Screenshots of Execution
15
10
List of Test Cases + Execution Time
15
11
Team Details
21












System Requirements 

Hardware

Minimum RAM: 8GB (Recommended: 16GB+)


Processor: Intel i5/i7 or AMD Ryzen 5/7


Storage: 50GB free space (to download software and libraries )


GPU: NVIDIA GeForce RTX 3050 (Recommended)




Software

OS: Windows 11(using), macOS, or Linux


Python Version: 3.9+


Database: NeonDB/PostgreSQL Version 16+

Schema: Prisma

Node.js: Version 16 or higher

Local LLM: Ollama Llama-2









FlowChart



Workflow Explanation
Step 1: Input Legacy PDF Reports (MOSPI)
The system takes old legacy reports from MOSPI (India) as input.


These reports can be either machine-readable (searchable text) or scanned images (non-searchable text).


Step 2: Handling Machine-Readable vs Non-Machine-Readable PDFs
Machine-Readable PDFs:


Directly parsed using Py2PDF to extract structured text.


Non-Machine-Readable PDFs:


Converted into images using PyMuPDF (Fitz).


Optical Character Recognition (OCR) is performed using PyTesseract to extract text.


Step 3: Data Processing (Conversion to JSON via Gemini API)
Extracted text is processed and formatted into a structured JSON using a custom schema.


Gemini API is used to intelligently extract relevant fields based on predefined Prisma model schema.


Step 4: Data Storage in PostgreSQL (NeON Tech)
The structured JSON data is stored in PostgreSQL using NeON Tech cloud database.


Each record is stored in a table named tablerecord, which consists of fields such as id, title, description, keywords, table_json, etc.


Step 5: Data Retrieval via Express Server
The stored JSON data is accessed using an Express.js backend server.


The server queries NeON DB to fetch relevant data based on user requests.


Step 6: User Query Interaction (Ollama Llama-2)
User queries are processed along with the extracted JSON data.


The combined data is sent to Ollama Llama-2, which analyzes and generates responses based on the input query.


Step 7: Output Response to User
The processed response is returned to the user in a structured format.


Users can interact with the extracted data dynamically.
























List of Python Libraries Used
It utilizes various Python libraries for data extraction, processing, storage, and interaction. Below is a categorized list:
1. Data Extraction & Processing
PyMuPDF (fitz) - Advanced PDF parsing for extracting structured text.


PyTesseract - Optical Character Recognition (OCR) for scanned PDFs.


Py2PDF - Custom PDF text extraction utility.


json - Handles JSON serialization and deserialization.


2. API Communication 
Requests – Sends HTTP requests to Gemini API for JSON conversion only


3. Database Handling
Prisma – ORM for managing PostgreSQL database interactions.


psycopg2 – Connects and interacts with the PostgreSQL database.


4. Backend & Server Communication
Uvicorn – Optional lightweight server for local testing.


FastAPI – Alternative backend framework (if needed).


5. Machine Learning Integration
Ollama API – Interacts with Llama-2 for AI-based query responses.


Installation using pip:
pip install PyMuPDF pytesseract requests prisma psycopg2 flask fastapi json




Environment Details

The Legacy Data Extraction and Processing Tool has been developed and tested in multiple environments to ensure compatibility and ease of execution.
Development Environment:
Local Machine: Used for primary development and execution.


Jupyter Notebook on VS Code: Used for debugging, step by step execution, and visualization of extracted data.


Testing Environment:
Google Colab: Used for cloud-based execution, testing large datasets, and verifying API interactions.


Setup Instructions:
For Local Execution:


Ensure all dependencies are installed via pip.


Run Python scripts directly from the terminal or within VS Code.


For Jupyter Notebook Execution:


Install Jupyter Notebook using:
pip install notebook
Launch Jupyter and run .ipynb files interactively.


For Google Colab:


Upload necessary Python scripts and data files to Google Drive.


Mount Google Drive in Colab using:


from google.colab import drive
drive.mount('/content/drive')
Run the scripts in Colab using the required API keys and credentials.
List of APIs Used

It integrates multiple APIs for data extraction, processing, and interaction. Below is a list of APIs used, their type (open-source or paid), and approximate costs.
API Name
Usage
Type
Approximate Cost
Gemini API
Converts extracted data to structured JSON
Paid (Free tier available)
~$0.01 per 1,000 API calls
Ollama Llama-2
Processes user queries and interacts with JSON data
Open-source
Free
Neon PostgreSQL
Cloud-based database for JSON storage & retrieval
Paid (Free tier available)
Depends on storage & queries

API Setup Instructions:
Gemini API:


Sign up at Gemini API and get an API key.
Add the key to the .env file:
GEMINI_API_KEY=your_api_key
Install necessary dependencies:
pip install requests
Make API calls using:
import requests
headers = {"Authorization": f"Bearer {GEMINI_API_KEY}"}
response = requests.post("https://gemini.api.url", headers=headers, json={"data": "your input"})
Ollama Llama-2:


Install Ollama:
curl -fsSL https://ollama.com/install.sh | sh
Run the model locally:
ollama run llama2
Send JSON data for interaction using:
import ollama
response = ollama.chat(model='llama2', messages=[{"role": "user", "content": "your question"}])

Neon PostgreSQL API:


Create a NeonDB instance at Neon.tech.
Store database credentials in .env:
DATABASE_URL=postgresql://username:password@neon_db_url/db_name.
Connect via Prisma or psycopg2 in Python.



































Test Cases

















Test Cases:




During Hindi text extraction, the Devanagari script was not extracted properly, resulting in numerous unreadable Unicode characters. Existing OCR models and NLP tools were not highly reliable for accurate extraction, especially for medical reports. To address this, we developed our own database of commonly used Hindi words in reports and implemented a keyword-matching technique after removing Unicode characters to ensure accurate and readable text extraction.



Test cases


Requirements.txt :-
List of files for executing packages (from pip and other windows executables)

pytesseract,
tesseract (windows local)
pypdf2,
fastapi,
uvcorn,
pymupdf,
fitz,
prisma,
google, 
poppler,
Fitz,
pyMuPDF,




                      Working of Chat UI (Chat with DB)

Setting Up and Using Chat with Data
Prerequisites
Before proceeding with the setup, kindly ensure the following requirements are met:
Ollama Installation: Verify that Ollama is installed on your system.
Run the command ollama run llama2 in the terminal.
If the command executes successfully without errors, Ollama is correctly installed.
If not, refer to Ollama’s official documentation for installation guidance.
Required Files:
A ZIP archive named chatWithData.zip, containing the following essential files:
index.html (Frontend UI)
server.js (Backend server script)
A second ZIP archive containing a .env file with database credentials.
Neon Database Setup:
The database connection URL has been obtained by first setting up the Extractor, which is required for proper database interaction.
The same database connection string is stored in the .env file of the second ZIP archive.
Ensure the .env file is correctly placed in the root directory of the project.
Installation and Setup
Follow these steps to extract, configure, and run the chat with data feature:
Step 1: Extract the Files
Locate the chatWithData.zip file in your system.
Extract the contents into a suitable directory using a file extraction tool or the following command in the terminal:
unzip chatWithData.zip -d ChatWithData
Navigate to the extracted folder:
cd ChatWithData
Extract the second ZIP archive containing the .env file and place it in the project root.
Step 2: Open the Project in a Code Editor
Open the extracted folder in your preferred code editor (e.g., VS Code, Sublime Text, or JetBrains WebStorm).
Ensure the directory structure includes index.html, server.js, and .env.
Step 3: Start the Backend Server
Open a terminal in the project directory.
Run the following command to start the Node.js server:
node server.js
If the server starts successfully, it will listen on a specified port (e.g., http://localhost:3000).
In case of errors, ensure Node.js is installed and verify the script dependencies.
Step 4: Launch the Frontend Interface
Use a local development server to render index.html in a browser.
Recommended approaches:
VS Code Live Server Extension: Install and activate the Live Server extension, then open index.html and click "Go Live."
Manual Hosting: Open index.html in a browser manually or use a local HTTP server with Python:
python3 -m http.server 8000
Then, open http://localhost:8000 in your browser.
Step 5: Interacting with the Chat Interface
Once the front end loads, you will see a chat interface.
Enter queries related to your uploaded file.
The system will process the input, and a loader animation will indicate the processing time.
After a few moments, a response will be generated and displayed based on the available data from the Neon database.
Troubleshooting
If you encounter issues during setup or execution, consider the following:
Server Not Starting:
Ensure Node.js is installed (node -v to check version).
Verify the required dependencies are installed.
Frontend Not Loading:
Confirm that index.html is served correctly via Live Server or an HTTP server.
No Response from Chat:
Ensure the backend is running (node server.js).
Check for API connectivity and database access.
Verify that the .env file contains the correct Neon database connection string.
Following these steps will ensure a smooth setup and execution of the Chat with Data feature using Ollama and NeonDB. For further assistance, refer to the official documentation or community support forums.

(Screenshot: Extracted data re-converted to table representation using a standard JSON-to-table converter)






(Screenshots: A chat asking “What is the latest recorded LFPR?” was asked, the UI response is shown along with the times taken)




			Working of Extractor and Storage 
Step 1: Extract the Files
Locate the DataExtractionAndStorage.zip file.
Extract its contents, which will create a folder named NW@IITGN.
Open this folder in VS Code or another suitable code editor.
Step 2: Configure the Database Connection
Open the .env file in the project root.
Replace the placeholder with the correct Neon database connection link.
Step 3: Install Dependencies
Open a terminal inside the NW@IITGN folder.
Run the following command to install required dependencies:
pip install -r requirements.txt
Step 4: Configure the PDF Processing
Open solutions.py in the code editor.
Locate the links = [] list inside the file.
Add the links of the PDFs you want to process within this list.
Modify the generateTablesList function to specify the starting and ending page numbers for table extraction.
Add the Gemini API key and correct model name in the designated variables.
Step 5: Run the Script
Execute the script with the following command:
python solutions.py
The script will process the provided PDFs, extracting tables even if they are scanned or old typewritten documents.
The extracted tables will be stored in nested JSON format inside the Neon PostgreSQL cloud database.
Troubleshooting
If you encounter issues during setup or execution, consider the following:
Server Not Starting:
Ensure Node.js or Python is installed (node -v or python --version to check version).
Verify the required dependencies are installed.
Frontend Not Loading:
Confirm that index.html is served correctly via Live Server or an HTTP server.
No Response from Chat:
Ensure the backend is running (node server.js).
Check for API connectivity and database access.
Verify that the .env file contains the correct Neon database connection string.
Data Not Extracted Properly:
Ensure the correct PDF links are provided in solutions.py.
Verify the starting and ending page numbers are correctly set.
Confirm that the Gemini API key and model name are valid.
Following these steps will ensure a smooth setup and execution of both the Chat with Data feature and Data Extraction & Storage module using Ollama, NeonDB, and the Gemini API. For further assistance, refer to the official documentation or community support forums.





(Screenshots showing tables being stored in JSON format at NeonDB)
