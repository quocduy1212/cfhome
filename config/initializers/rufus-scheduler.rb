require 'rufus-scheduler'

UP_TREND = 'up_trend_24h_change'

scheduler = Rufus::Scheduler.new

scheduler.every '4m' do
  begin
		puts "#{Time.now}: scheduler trigger #{UP_TREND}"
		msg = Checker::TrendUpDailyChange.check_all(UP_TREND)
		puts "#{Time.now}: #{UP_TREND} #{msg}"
  rescue Exception => ex
    puts ex
  end
end
