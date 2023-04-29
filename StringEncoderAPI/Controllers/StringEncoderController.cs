using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using System.Text;
using System.Text.Json.Serialization;

namespace StringEncoderAPI.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class StringEncoderController : Controller
    {
        private static bool isProcessing = false;
        private static CancellationTokenSource? cancellationToken;

        [HttpPost]
        public async Task<IActionResult> EncodeString([FromBody] string input)
        {
            if (isProcessing)
            {
                return StatusCode(StatusCodes.Status409Conflict, "Encoding currently in progress");
            }

            isProcessing = true;
            cancellationToken = new CancellationTokenSource();

            var encodedText = Convert.ToBase64String(Encoding.UTF8.GetBytes(input));
            var random = new Random();
            
            foreach(char c in encodedText) 
            {
                var delay = random.Next(1000, 6000);//putting max value at 6000 because otherwise 5000 will be excluded
                await Task.Delay(delay, cancellationToken.Token);

                if (cancellationToken.IsCancellationRequested)
                {
                    isProcessing = false;
                    return StatusCode(StatusCodes.Status204NoContent);
                }                         

                await HttpContext.Response.WriteAsync(c.ToString());
                await HttpContext.Response.Body.FlushAsync();
            }

            await HttpContext.Response.CompleteAsync();

            isProcessing = false;
            return Ok();
        }

        [HttpDelete]
        public IActionResult Delete()
        {
            if (!isProcessing)
            {
                return StatusCode(409, "No encoding process is currently running.");
            }

            cancellationToken.Cancel();
            isProcessing = false;
            return Ok();
        }
    }
}
