require 'rufus-scheduler'

UP_TREND = 'up_trend'

scheduler = Rufus::Scheduler.new

scheduler.every '2m' do
  begin
    puts "#{Time.now}: scheduler trigger #{UP_TREND}"
    msg = Checker::TrendUp.check_all(UP_TREND)
    puts "#{Time.now}: #{UP_TREND} #{msg}"
  rescue Exception => ex
    puts ex
  end
end
