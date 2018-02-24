module Checker
  class TrendUpTeller
    TREND_WEBHOOK = ENV["TREND_WEBHOOK"]
    BTC_24H_CHANGE = 0.05
    USDT_24H_CHANGE = 0.01

    def self.check_all
      begin
        DpxLogger.log_debug("Checker::TrendUpTeller.check_all")

        markets = BittrexProvider::Summary.all
        btc_all = markets.select{|m| m.name.start_with?('BTC-') }.sort{|x, y| y.base_volume <=> x.base_volume}
        btc = btc_all[0..btc_all.length/3].select{ | m | TrendUpTeller.daily_change(m) >= BTC_24H_CHANGE }
        usdt_all = markets.select{|m| m.name.start_with?('USDT-') }
        usdt = usdt_all.select{ | m | TrendUpTeller.daily_change(m) >= USDT_24H_CHANGE }

        DpxLogger.log_brief("Checker::TrendUpTeller.check_all | #{btc.length} BTC | #{usdt.length} USDT")
        (btc + usdt).each do |m|
          teller = Tellers::FortuneTeller.new(m.name)
          five_min = teller.five_min_teller
          hour = teller.hour_teller
          day = teller.day_teller

          if (five_min[:bb] > 0 || hour[:bb] > 0 || day[:bb] > 0)
            # DpxLogger.log_brief("#{m.name} | +#{(TrendUpTeller.daily_change(m) * 100).round(2)}% | BB: #{day[:bb]} 1D, #{hour[:bb]} 1H, #{five_min[:bb]} 5M")
            # DpxLogger.log_brief("#{m.name} | +#{(TrendUpTeller.daily_change(m) * 100).round(2)}% | Up: #{day[:up]} 1D, #{hour[:up]} 1H, #{five_min[:up]} 5M")
            # DpxLogger.log_brief("#{m.name} | +#{(TrendUpTeller.daily_change(m) * 100).round(2)}% | 5M: #{TrendUpTeller.format_recent_per_change(five_min[:hc])}")
            # DpxLogger.log_brief("#{m.name} | +#{(TrendUpTeller.daily_change(m) * 100).round(2)}% | 1M: #{TrendUpTeller.format_recent_per_change(hour[:hc])}")
            # DpxLogger.log_brief("#{m.name} | +#{(TrendUpTeller.daily_change(m) * 100).round(2)}% | 1D: #{TrendUpTeller.format_recent_per_change(day[:hc])}")

            surfer = day[:bb] > 0 && hour[:bb] > 0 && five_min[:bb] > 0 ? ':surfer:' : ''
            rocket = day[:up] > 0 && hour[:up] > 0 && five_min[:up] > 0 ? ':rocket:' : ''

            msg = "*#{m.name}* `+#{(TrendUpTeller.daily_change(m) * 100).round(2)}%` #{surfer} #{rocket}"
            msg += "\n• BB streak"
            msg += "\n>` 1D | 1H | 5M `"
            msg += "\n>`  #{day[:bb]} |  #{hour[:bb]} |  #{five_min[:bb]} `"
            msg += "\n• Up streak"
            msg += "\n>` 1D | 1H | 5M `"
            msg += "\n>`  #{day[:up]} |  #{hour[:up]} |  #{five_min[:up]} `"
            msg += "\n• History"
            msg += "\n>`5M: #{TrendUpTeller.format_recent_per_change(five_min[:hc])}`"
            msg += "\n>`1H: #{TrendUpTeller.format_recent_per_change(hour[:hc])}`"
            msg += "\n>`1D: #{TrendUpTeller.format_recent_per_change(day[:hc])}`"

            con = Faraday.new(:url => TREND_WEBHOOK)
            response = con.post do |req|
              req.headers['Content-Type'] = 'application/json'
              req.body = "{ 'text': '#{msg}'}"
            end
            if (response.status == 200)
              DpxLogger.log_brief("Checker::TrendUpTeller.check_all | #{m.name} | pushed to slack")
            end
          else
            # DpxLogger.log_brief("#{m.name} | +#{(TrendUpTeller.daily_change(m) * 100).round(2)}% skip!")
          end
        end
        ''
      rescue Exception => ex
        DpxLogger.log_exception(ex)
        ''
      end
    end

    def self.daily_change(m)
      (m.last - m.previous_day) / m.previous_day
    end

    def self.format_recent_per_change(hc)
      tmp = hc.map do |h|
        if (h > 0)
          '+%02.f%%' % h
        elsif (h < 0)
          '%03.f%%' % h
        else
          '---%'
        end
      end
      tmp.join(' | ')
    end
  end
end
