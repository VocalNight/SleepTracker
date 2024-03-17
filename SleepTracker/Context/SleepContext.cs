using Microsoft.EntityFrameworkCore;
using SleepTracker.Model;

namespace SleepTracker.Context
{
    public class SleepContext : DbContext
    {
        public SleepContext( DbContextOptions<SleepContext> options ) : base(options) { }


        protected override void OnModelCreating( ModelBuilder modelBuilder )
        {
            base.OnModelCreating(modelBuilder);
            modelBuilder.Entity<SleepRecordModel>().HasData(
                new SleepRecordModel { Id = 1, Time = "8:00:00", Date = DateOnly.FromDateTime(DateTime.Today) },
                new SleepRecordModel { Id = 2, Time = "8:00:00", Date = DateOnly.FromDateTime(DateTime.Today) }
            );

        }


        public DbSet<SleepRecordModel> SleepRecords { get; set; }
    }
}
