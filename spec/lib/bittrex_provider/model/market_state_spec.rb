require 'spec_helper'

describe BittrexProvider::Model::MarketState do
  describe '#add_tick' do
    subject { described_class.new }
    context 'add first tick' do
      let(:tick) { Model::Tick.new({
        "O": 10,
        "C": 20,
        "T": '2017-12-31T03:45:00'
      })}
      it {
        subject.add_tick(tick)
        subject.trend.to eq('-')
      }
    end
  end
end
