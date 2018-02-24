class DpxLogger
  cattr_accessor :level
  @@level = 'brief'

  def self.log_brief(msg)
    puts "#{Time.now}: [[ BRIEF ]] #{msg}"
  end
  def self.log_detail(msg)
    if (DpxLogger.detail? || DpxLogger.debug?)
      puts "#{Time.now}: [[ DETAIL ]] #{msg}"
    end
  end
  def self.log_debug(msg)
    if (DpxLogger.debug?)
      puts "#{Time.now}: [[ DEBUG ]] #{msg}"
    end
  end
  def self.log_exception(ex, msg = '')
    puts "#{Time.now}: [[ ERROR ]] #{msg} #{ex}"
    puts ex.backtrace[0..(ex.backtrace.length > 5 ? 5 : ex.backtrace.length)].to_yaml
  end

  def self.brief?
    @@level == 'brief'
  end
  def self.detail?
    @@level == 'detail'
  end
  def self.debug?
    @@level == 'debug'
  end
end
