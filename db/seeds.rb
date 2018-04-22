
1.times do 
  Bio.create(
    body: '<p>"THE ONLY THING NECESSARY FOR THE TRIUMPH OF EVIL IS FOR GOOD MEN TO DO NOTHING!" I am pretty down to earth guy who strives to challenge himself. I don\'t like to fail so I do everything in my power to achieve my goals. I have made mistakes in my life but have learned from them and continue to grow.</p>
    <p>"At times many of us let that enemy of achievement- even the culprit \'self-defeat\' - dwarf our aspirations, smother our dreams, cloud our vision, and impare our lives. The enemy\'s voice whispers in our ears, \'You can\'t do it.\' \'You\'re too young.\' \'You\'re too old.\' \'You\'re nobody.\' This is when we remember that we are created in the image of God. Reflection on this truth provides a profound sense of strength and power." - President Thomas S. Monson</p>'
  )
  end

1.times do
  User.create(
    email: 'admin@admin.com',
    password: 'password',
    role: 'admin'
  )
end 

Setting.create()

puts 'Setting created with defaults'
