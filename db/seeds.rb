5.times do 
  ResearchInterest.create(
    topic: Faker::Company.catch_phrase,
    title: Faker::Company.bs,
    body: Faker::Lorem.paragraph
  )
  end 

1.times do
  User.create(
    email: 'admin@admin.com',
    password: 'password',
    role: 'admin'
  )
end 