namespace SleepTracker.Model
{
    public class SleepRecordModel
    {
        public int Id { get; set; }

        public DateTime TimeStart {  get; set; }

        public DateTime TimeEnd { get; set; }

        public string Time { get; set; }
    }
}
