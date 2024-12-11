# import scrapy
# from pathlib import Path
# import os

# def get_usernames(usernames=None, filename=None):
#     if usernames:
#         return usernames.split(',')
#     elif filename:
#         if not os.path.isfile(filename):
#             raise FileNotFoundError(f"The file {filename} does not exist.")
#         with open(filename, 'r') as f:
#             return [line.strip() for line in f if line.strip()]
#     else:
#         raise ValueError("Either 'usernames' or 'filename' must be provided.")

# class QuotesSpider(scrapy.Spider):
#     name = "quotes"
#     start_urls = [
#         "https://quotes.toscrape.com/page/1/",
#         "https://quotes.toscrape.com/page/2/",
#     ]

#     def parse(self, response):
#         for quote in response.css("div.quote"):
#             yield {
#                 "author": quote.xpath("span/small/text()").get(),
#                 "text": quote.css("span.text::text").get(),
#             }

#         next_page = response.css('li.next a::attr("href")').get()
#         if next_page is not None:
#             yield response.follow(next_page, self.parse)

import scrapy
import os
import argparse


class hackerrankSpider(scrapy.Spider):
    name = "hackerrank"

    parser = argparse.ArgumentParser(description="Scrape HackerRank profiles")
    parser.add_argument("--usernames", type=str, help="Comma-separated list of usernames")
    parser.add_argument("--filename", type=str, help="File with line-separated usernames")

    args = parser.parse_args()

    def get_usernames(usernames=None, filename=None):
        if usernames:
            return usernames.split(',')
        elif filename:
            if not os.path.isfile(filename):
                raise FileNotFoundError(f"The file {filename} does not exist.")
            with open(filename, 'r') as f:
                return [line.strip() for line in f if line.strip()]
        else:
            raise ValueError("Either 'usernames' or 'filename' must be provided.")

    def scrape(self, usernames=None, filename=None):
        base_url = "https://www.hackerrank.com/profile/{}"
        user_list = self.get_usernames(usernames, filename)
        return [base_url.format(username) for username in user_list]
    
    start_urls = scrape(usernames=args.usernames, filename=args.filename)


    def parse(self, response):
        for badge in response.css("div.badges-list"):
            badge.xpath("//div[@class=hacker-badge]/div[@class=ui-tooltip-wrapper]/class()")

        next_page = response.css('li.next a::attr("href")').get()
        if next_page is not None:
            yield response.follow(next_page, self.parse)