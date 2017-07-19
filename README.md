INSTRUCTIONS:

++Installation:

> 1.Unzip the files, you will see "data-integration" folder.  
> 2.Download and install NodeJS. (https://nodejs.org/en/download/)  
> 3.Go to "data-integration" folder and open Command Line (Windows) / Terminal (Ubuntu/Mac) here.  
> 4.Type "npm install".

++How to use:
> 1.Open "config.json" file in "data-integration" folder with any text editor.  
> 2."instanceABaseUrl" : put your instance A address here. (you need to put full URL, example: "https://hmis.aa.com")
> 3."instanceBBaseUrl" : put your instance B address here. (you need to put full URL, example: "https://hmis.bb.com")
> 4."rootOrgUnitId": put your highest level (root) organisation unit ID here.  
> 5."dataSetId": put the ID of data set.  
> 6."periodType": period type of the data set or this can be known as how often do the data be synced. (can be "daily","monthly","weekly","quarterly","yearly")  
> 7."username" and "password": put your username and password. (for both instance A and B)  
> 8.To run the script, go to "data-integration" folder and open Command Line / Terminal and type "node index.js".The script will take all the data from last period count from current date (*) from data set in instance A and push into instance B automatically. You can see the result which stored in "history.log" file, this is a text file and can be opened in any text editor.

	(*): depend on selected "periodType", example:
	current date is: 2017-07-19
	period type: monthly
	data range: 2017-06-19 -> 2017-07-18
