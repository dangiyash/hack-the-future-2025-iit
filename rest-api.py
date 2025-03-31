from fastapi import FastAPI, Request, HTTPException
import json
from solution import pushTablesInSequence, pdfFromLink

app = FastAPI()

# POST endpoint to handle raw JSON
@app.post("/extract-and-push")
async def process_json(request: Request):
    # Read the raw JSON body
    raw_body = await request.body()

    data = json.loads(raw_body)
    
    """
        format of body: {
            pdfLink: string,
            startFrom: number,
            endBefore: number,
        }
    """
    
    print(data)
    
    try:
        
        if 'pdfLink' not in data:
          Exception("please provide ")  

        pdf_bin = pdfFromLink(data['pdfLink']);
        

        if 'startFrom' not in data:
            data['startFrom'] = 0
        
        if 'endBefore' not in data:
            data['endBefore'] = -1

        update = await pushTablesInSequence(pdf_bin, int(data['startFrom']), int(data['endBefore']))

        return {
            "message": "All pages pushed successfully to database.",
            "data": data,
            "update": update
        }
    
    except Exception as err:
        raise HTTPException(status_code=500, detail=str(err))

