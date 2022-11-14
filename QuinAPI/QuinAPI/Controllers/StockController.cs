using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;

namespace QuinAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class StockController : ControllerBase
    {
        [Route("GetStocks")]
        [HttpGet]
        public async Task<ActionResult<List<Stock>>> GetStocks()
        {
            try
            {
                using (StreamReader sr = new StreamReader("StockData/Stocks.json"))
                {
                    string json = sr.ReadToEnd();
                    List<Stock> s = JsonConvert.DeserializeObject<List<Stock>>(json);
                    return s;
                }
            }
            catch (Exception e)
            {
                throw e;
            }

        }

        [Route("GetStockValues")]
        [HttpGet]
        public async Task<ActionResult<List<StockValues>>> GetStockValues()
        {
            try
            {
                using (StreamReader sr = new StreamReader("StockData/Stock Values.json"))
                {
                    string json = sr.ReadToEnd();
                    List<StockValues> s = JsonConvert.DeserializeObject<List<StockValues>>(json);
                    return s;
                }
            }
            catch (Exception e)
            {
                throw e;
            }

        }
    }
}
