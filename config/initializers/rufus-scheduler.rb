require 'rufus-scheduler'

Rails.application.eager_load!

scheduler = Rufus::Scheduler.new

scheduler.every '4m' do
  begin
    DpxLogger.log_brief("Scheduler | Checker::TrendUpTeller.check_all")
    Checker::TrendUpTeller.check_all()
  rescue Exception => ex
    DpxLogger.log_exception(ex)
  end
end
