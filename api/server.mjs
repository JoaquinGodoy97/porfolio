import express from 'express';
// import { fetchRepoData } from '../services/useRepoList.mjs'
import {getRepoList} from '../tmp/scrapping/fetchRepo.mjs'
import serverless from 'serverless-http';

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static('public'));

app.get('/api/repos', async (req, res) => {
    try{
        const repoData = await getRepoList();
        console.log('Checking Data on server.mjs:', repoData)

        if (!repoData) {
            console.error('No data returned from getRepoList');
            return res.status(500).json({ error: 'No data received' });
        }
        
        res.json(repoData);
    } catch (err) {
        res.status(500).send(err.message)
    }
})

if (process.env.NODE_ENV !== 'production') { 
    app.listen(PORT, () => { 
        console.log(`Server running on http://localhost:${PORT}`); 
    }); 
}

export default serverless(app);
