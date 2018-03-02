require 'rails_helper'

RSpec.describe Api::FiltersController, type: :controller do

  describe "GET #bb" do
    it "returns http success" do
      get :bb
      expect(response).to have_http_status(:success)
    end
  end

  describe "GET #up_trend" do
    it "returns http success" do
      get :up_trend
      expect(response).to have_http_status(:success)
    end
  end

end
