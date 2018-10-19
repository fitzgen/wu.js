FROM ruby:2.5

WORKDIR /usr/src/app

EXPOSE 4000

COPY Gemfile ./
RUN gem install jekyll rouge
RUN bundle install

COPY . .

CMD ["bundle", "exec", "jekyll", "serve", "-H", "0.0.0.0", "--watch"]
