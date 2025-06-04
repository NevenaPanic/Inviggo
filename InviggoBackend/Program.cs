namespace InviggoBackend
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var _cors = "my_cors";
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            builder.Services.AddCors(options =>
            {
                options.AddPolicy(name: _cors,
                                  policy =>
                                  {
                                      policy.WithOrigins("http://localhost:4000");
                                  });
            });

            var app = builder.Build();

            // Configure the HTTP request pipeline.

            app.UseCors(_cors);


            app.UseHttpsRedirection();

            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
