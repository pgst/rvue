module CalenderData extend ActiveSupport::Concern
  included do
  end

  def calender_for_view(month)
    @enable_days = Calender.enable
    if month == 'next'
      @today = Date.today.next_month
    else
      @today = Date.today
    end
    @this_month = @today.strftime('%m')
    month_1st = @today.beginning_of_month          # 月初の日付
    month_last = @today.end_of_month               # 月末の日付
    month_1st_wd = @today.beginning_of_month.wday  # 月初の日付の曜日
    cal_first = month_1st - month_1st_wd           # 月初の日付の週の先頭の日付
    cal_end = cal_first + 6                        # 月初の日付の週の最後の日付
    @weeks = []
    6.times do |i|
      week_range = Range.new(cal_first + 7 * i, cal_end + 7 * i)
      @weeks << week_range
      break if week_range.include?(month_last)
    end
    @day_enable = make_array_enable_days(@today, @weeks, @enable_days)
  end

  def make_array_enable_days(today, weeks, enable_days)
    enables = enable_days.map do |ed|
      ed.day
    end
    day_enable = {}
    weeks.each do |wk|
      wk.each do |day|
        val = enables.include?(day) ? :enable : :closed
        day_enable[day] = val
      end
    end
    return day_enable
  end
end
