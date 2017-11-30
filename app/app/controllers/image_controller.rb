class ImageController < ApplicationController
  skip_before_action :verify_authenticity_token

  def index
    j = JSON.parse(request.raw_post)
    blob = Base64.decode64(j['image'].gsub("data:image/jpeg;base64,",""))
    img = Magick::Image::from_blob(blob)[0]
    filter = j['filter']
    if filter == "charcoal"
      img = img.charcoal
    end
    if filter == "flop"
      img = img.flop
    end
    if filter == "blur"
      img = img.motion_blur(0, 10, 30)
    end
    if filter == "emboss"
      img = img.emboss(2)
    end
    data_uri = Base64.encode64(img.to_blob).gsub(/\n/, "")
    data_uri = "data:image/jpeg;base64," + data_uri


    render :plain => data_uri

  end

end
