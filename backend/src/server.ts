import { app } from './app'
import { PORT } from './config/env'

app.listen(PORT, () => {
  console.log(`API démarrée sur http://localhost:${PORT}`)
})
